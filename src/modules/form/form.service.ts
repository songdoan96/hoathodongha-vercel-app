import { Injectable, NotFoundException } from '@nestjs/common';
import {
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { linesList } from '../../lib/constant';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Form } from '../../../generated/prisma';
export enum LoaiDon {
  LEAVE = 'leave',
  OUT = 'out',
}

@Injectable()
export class FormService {
  constructor(private prisma: PrismaService) {}
  async create(createFormDto: CreateFormDto & { to: string }) {
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

    return await this.prisma.form.create({
      data: {
        ...createFormDto,
        tungay: createFormDto.tungay ? new Date(createFormDto.tungay) : null,
        denngay: createFormDto.denngay ? new Date(createFormDto.denngay) : null,
        rangay: createFormDto.rangay ? new Date(createFormDto.rangay) : null,
      },
    });
  }

  async findAll({
    msnv,
    to,
    ngaytao,
    type,
    value,
  }: {
    msnv?: string;
    to?: string;
    ngaytao?: string;
    type?: string;
    value?: string;
  }) {
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
