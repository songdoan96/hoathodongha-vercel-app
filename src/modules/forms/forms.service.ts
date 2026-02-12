import { Injectable, NotFoundException } from '@nestjs/common';
import {
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto, SignatureFormDto, UpdateFormDto } from './forms.dto';
import { linesList } from '../../lib/constant';
import { Form, LOAIDON } from '../../../generated/prisma';
import { FirebaseService } from '../firebase/firebase.service';
import { diffHoursOut } from '../../lib/helpers';

@Injectable()
export class FormsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findOne(id: string) {
    return await this.prisma.form.findUnique({ where: { id } });
  }

  async create(createFormDto: CreateFormDto) {
    const employee = await this.prisma.employee.findFirst({
      where: { msnv: createFormDto.msnv },
      select: { id: true, bophan: true },
    });
    if (employee && employee.bophan !== createFormDto.to) {
      await this.prisma.employee.update({
        where: { id: employee.id },
        data: { bophan: createFormDto.to },
      });
    }
    if (createFormDto.tungay) {
      createFormDto.tungay = new Date(createFormDto.tungay);
    }
    if (createFormDto.denngay) {
      createFormDto.denngay = new Date(createFormDto.denngay);
    }
    if (createFormDto.rangay) {
      createFormDto.rangay = new Date(createFormDto.rangay);
    }

    const isLeader = await this.prisma.formLeader.findFirst({
      where: {
        msnv: createFormDto.msnv.trim(),
      },
    });
    const form = await this.prisma.form.create({
      data: {
        ...createFormDto,
        msnv: createFormDto.msnv.trim(),
        giamdocky: isLeader ? true : false,
      },
    });

    // Gửi thông báo
    const needToTruong = linesList.find(
      (line) => line.value === form.to,
    )?.needToTruong;
    const needQuanDoc = linesList.find(
      (line) => line.value === form.to,
    )?.needQuanDoc;

    if (!needToTruong && !needQuanDoc) {
      await this.formSendNotification(form, 'lanhdao');
    }
    if (needToTruong) {
      await this.formSendNotification(form, form.to);
    }
    if (!needToTruong && needQuanDoc) {
      await this.formSendNotification(form, form.to.split('_')[0] + '_quandoc');
    }

    return form;
  }

  async findAll({
    month,
    cursor,
    type,
    value,
  }: {
    month: string;
    cursor?: string;
    type?: string;
    value?: string;
  }) {
    const limit = 30;
    const query: {
      where: { ngaytao: { gte: Date; lte: Date } };
      take: number;
      cursor?: { id: string };
      skip?: number;
      orderBy: { id: 'desc' };
    } = {
      where: {
        ngaytao: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
      take: limit + 1,
      orderBy: { id: 'desc' },
    };
    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }
    if (type && value) {
      query.where[type] = value;
    }
    const forms = await this.prisma.form.findMany(query);
    const hasNext = forms.length > limit;
    return {
      forms: hasNext ? forms.slice(0, -1) : forms,
      nextCursor: hasNext ? forms[limit - 1].id : null,
    };
  }

  async countForms(month: string) {
    const counts = await this.prisma.form.groupBy({
      by: ['msnv', 'loaidon'],
      where: {
        ngaytao: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        msnv: 'asc',
      },
    });
    return counts.map((item) => ({
      msnv: item.msnv,
      loaidon: item.loaidon,
      count: item._count._all,
    }));
  }

  async update(id: string, updateFormDto: UpdateFormDto) {
    const form = await this.prisma.form.findFirst({
      where: { id },
    });
    if (!form) {
      throw new NotFoundException();
    }
    if (updateFormDto.rangay)
      updateFormDto.rangay = new Date(updateFormDto.rangay);
    if (updateFormDto.tungay)
      updateFormDto.tungay = new Date(updateFormDto.tungay);
    if (updateFormDto.denngay)
      updateFormDto.denngay = new Date(updateFormDto.denngay);

    return this.prisma.form.update({
      where: { id },
      data: updateFormDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.form.delete({ where: { id } });
  }
  async securityGetGoOut() {
    return await this.prisma.form.findMany({
      where: {
        loaidon: LOAIDON.out,
      },
      orderBy: {
        id: 'desc',
      },
      take: 100,
    });
  }

  async signature(id: string, signatureFormDto: SignatureFormDto) {
    const { chucvu, hoten, thaythe } = signatureFormDto;

    const form = await this.prisma.form.update({
      where: { id },
      data: {
        [chucvu]: hoten,
        thaythe,
      },
    });
    const needToTruong = linesList.find(
      (line) => line.value === form.to,
    )?.needToTruong;
    const needQuanDoc = linesList.find(
      (line) => line.value === form.to,
    )?.needQuanDoc;
    if (chucvu === 'quandoc' || (needToTruong && !needQuanDoc)) {
      await this.formSendNotification(form, 'lanhdao');
    } else if (chucvu !== 'lanhdao') {
      await this.formSendNotification(form, form.to.split('_')[0] + '_quandoc');
    }
    return form;
  }

  async employeeDetail(month: string, msnv: string) {
    return await this.prisma.form.findMany({
      where: {
        msnv,
        ngaytao: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
      orderBy: [{ id: 'desc' }, { loaidon: 'asc' }],
    });
  }

  async formSendNotification(form: Form, bophan: string) {
    const accounts = await this.prisma.user.findMany({
      where: {
        bophan,
        fcm_token: { not: null },
      },
      select: { fcm_token: true },
    });
    const tokens = accounts.map((account) => account.fcm_token || '');
    if (tokens.length > 0) {
      await this.firebaseService.sendToMultipleDevices(tokens, {
        title:
          linesList.find((line) => line.value === form.to)?.name +
          ' có đơn cần ký',
        body: `${form.msnv}: ${form.hoten}`,
        link: 'https://hoathodongha.vercel.app/tao-don/xem-don/' + form.id,
      });
    }
  }

  async organizationExport(date: string) {
    if (date === 'leave') {
      const form = await this.prisma.form.findMany({
        where: {
          loaidon: LOAIDON.leave,
        },
        orderBy: { id: 'asc' },
      });
      return exportFile(form);
    }
    if (date === 'goout') {
      const forms = await this.prisma.form.findMany({
        where: {
          loaidon: LOAIDON.out,
        },
        orderBy: { id: 'asc' },
      });
      return exportFile(forms, 'goout');
    } else {
      if (date.length == 7) {
        const forms = await this.prisma.form.findMany({
          where: {
            loaidon: LOAIDON.leave,
            ngaytao: {
              gte: startOfMonth(new Date(date)),
              lte: endOfMonth(new Date(date)),
            },
          },
          orderBy: {
            id: 'asc',
          },
        });
        return exportFile(forms);
      } else {
        const forms = await this.prisma.form.findMany({
          where: {
            loaidon: LOAIDON.leave,
            ngaytao: {
              gte: startOfDay(new Date(date)),
              lte: endOfDay(new Date(date)),
            },
          },
          orderBy: {
            id: 'asc',
          },
        });
        return exportFile(forms);
      }
    }
  }

  async organizationExportFile(type: string, time: string) {
    const forms = await this.prisma.form.findMany({
      where: {
        loaidon: type === 'leave' ? LOAIDON.leave : LOAIDON.out,
        ngaytao: {
          gte:
            time.length === 7
              ? startOfMonth(new Date(time))
              : startOfDay(new Date(time)),
          lte:
            time.length === 7
              ? endOfMonth(new Date(time))
              : endOfDay(new Date(time)),
        },
      },
      orderBy: { id: 'asc' },
    });
    return exportFile(forms, type === 'leave' ? LOAIDON.leave : LOAIDON.out);
  }
}
function exportFile(forms: Form[], type = 'leave') {
  const data: any[] = [];
  const label =
    type === 'leave'
      ? [
          'Ngày tạo đơn',
          'Họ tên',
          'Tổ',
          'MSNV',
          'Số ngày nghỉ',
          'Từ ngày',
          'Đến ngày',
          'Lý do',
          'Tổ trưởng',
          'Quản đốc',
          'Lãnh đạo',
        ]
      : [
          'Ngày tạo đơn',
          'Họ tên',
          'Tổ',
          'MSNV',
          'Từ giờ',
          'Đến giờ',
          'Giờ ra',
          'Giờ vào',
          'Lý do',
          'Tổ trưởng',
          'Quản đốc',
          'Lãnh đạo',
          'Số giờ ra',
        ];

  if (type === 'leave') {
    forms.map((l) =>
      data.push([
        format(new Date(l.ngaytao), 'dd/MM/yyyy'),
        l.hoten,
        linesList.find((line) => line.value === l.to)?.name,
        l.msnv,
        l.songaynghi,
        l.tungay ? format(new Date(l.tungay), 'dd/MM/yyyy') : '',
        l.denngay ? format(new Date(l.denngay), 'dd/MM/yyyy') : '',
        l.lydo,
        l.totruong,
        l.quandoc,
        l.lanhdao,
      ]),
    );
  } else {
    forms.map((l) =>
      data.push([
        format(new Date(l.ngaytao), 'dd/MM/yyyy'),
        l.hoten,
        linesList.find((line) => line.value === l.to)?.name,
        l.msnv,
        l.tugio,
        l.dengio,
        l.giora,
        l.giovao,
        l.lydo,
        l.totruong,
        l.quandoc,
        l.lanhdao,
        l.giora ? Number(diffHoursOut(l.giora, l.giovao || '').toFixed(1)) : '',
      ]),
    );
  }
  return [label, ...data];
}
