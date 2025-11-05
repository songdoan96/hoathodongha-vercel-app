import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { Form } from '../../../generated/prisma';
import { linesList } from '../../lib/constant';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormDto, UpdateFormDto, SignatureFormDto } from './form.dto';
export enum LoaiDon {
  LEAVE = 'leave',
  OUT = 'out',
}

@Injectable()
export class FormService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
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

    const form = await this.prisma.form.create({
      data: createFormDto,
    });
    // Gửi thông báo
    const needToTruong = linesList.find(
      (line) => line.value === form.to,
    )?.needToTruong;
    const needQuanDoc = linesList.find(
      (line) => line.value === form.to,
    )?.needQuanDoc;
    if (!needToTruong && !needQuanDoc)
      await this.formSendNotification(form, 'lanhdao');
    if (needToTruong) await this.formSendNotification(form, form.to);
    if (!needToTruong && needQuanDoc)
      await this.formSendNotification(form, form.to.split('_')[0] + '_quandoc');
    return form;
  }

  async findAll({ type, value }: { type?: string; value?: string }) {
    const month = type === 'ngaytao' && value ? new Date(value) : new Date();
    if (type && value && type !== 'ngaytao') {
      return await this.prisma.form.findMany({
        where: {
          [type]: value,
        },
        orderBy: {
          id: 'desc',
        },
      });
    }
    return await this.prisma.form.findMany({
      where: {
        ngaytao: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.form.findFirst({ where: { id } });
  }

  async update(id: string, updateFormDto: UpdateFormDto) {
    const form = await this.prisma.form.findFirst({
      where: { id },
    });
    if (!form) {
      throw new NotFoundException();
    }
    // const { id: idForm, ...dataRemoveId } = form;
    // const data = {
    //   ...dataRemoveId,
    //   ...updateFormDto,
    // };

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

  async remove(id: string) {
    return await this.prisma.form.delete({ where: { id } });
  }

  async securityGetGoOut() {
    return await this.prisma.form.findMany({
      where: {
        loaidon: LoaiDon.OUT,
      },
      orderBy: {
        id: 'desc',
      },
      take: 50,
    });
  }
  async organizationExport(date: string) {
    if (date === 'leave') {
      const form = await this.prisma.form.findMany({
        where: {
          loaidon: LoaiDon.LEAVE,
        },
        orderBy: { id: 'asc' },
      });
      return exportFile(form);
    }
    if (date === 'goout') {
      const forms = await this.prisma.form.findMany({
        where: {
          loaidon: LoaiDon.OUT,
        },
        orderBy: { id: 'asc' },
      });
      return exportFile(forms, 'goout');
    } else {
      if (date.length == 7) {
        const forms = await this.prisma.form.findMany({
          where: {
            loaidon: LoaiDon.LEAVE,
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
            loaidon: LoaiDon.LEAVE,
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
  async formSendNotification(form: Form, bophan: string) {
    const url = 'https://api.onesignal.com/notifications?c=push';
    const options = {
      method: 'POST',
      headers: {
        Authorization: this.configService.get('onesignal.auth'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: this.configService.get('onesignal.app_id'),
        headings: {
          en:
            linesList.find((line) => line.value === form.to)?.name +
            ' có đơn cần ký',
        },
        contents: {
          en: `${form.msnv}: ${form.hoten}`,
        },
        filters: [
          {
            field: 'tag',
            relation: '=',
            key: 'forms',
            value: bophan,
          },
        ],
        url: 'https://hoathodongha.vercel.app/tao-don/xem-don/' + form.id,
      }),
    };
    return await fetch(url, options);
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
      ]),
    );
  }
  return [label, ...data];
}
