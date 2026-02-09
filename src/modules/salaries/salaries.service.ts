import { Injectable, NotFoundException } from '@nestjs/common';
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
} from 'date-fns';
import { Salary } from '../../../generated/prisma';
import { FirebaseService } from '../firebase/firebase.service';
import { PrismaService } from '../prisma/prisma.service';
import { SalariesCheckDto, SalariesCreateNoteDto } from './salaries.dto';

@Injectable()
export class SalariesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}
  async upfile(rows: Salary[], body: { month: string }) {
    const data = rows.map((item: Salary) => ({
      ...item,
      thang: new Date(body.month),
      cccd: String(item.cccd),
      msnv: String(item.msnv).replace(/dh/gi, ''),
    }));
    return await this.prisma.salary.createMany({
      data,
    });
  }
  async checkSalary(salariesCheckDto: SalariesCheckDto) {
    salariesCheckDto.msnv = salariesCheckDto.msnv.trim().replace(/dh/gi, '');
    const { cccd, msnv, token } = salariesCheckDto;
    const salary = await this.prisma.salary.findFirst({
      where: {
        msnv,
        cccd,
      },
      orderBy: { id: 'desc' },
    });

    if (!salary)
      throw new NotFoundException('Không tìm thấy thông tin tra cứu');
    if (token) {
      await this.prisma.fCMToken.upsert({
        where: { msnv },
        update: { token },
        create: { token, msnv },
      });
    }

    return salary;
  }

  async details(msnv: string, cccd: string, month: string) {
    const date = new Date(month);
    console.log('🚀 ~ SalariesService ~ details ~ msnv:', msnv, cccd, month);
    console.log('month', {
      gte: startOfMonth(date),
      lte: endOfMonth(date),
    });
    console.log('year', {
      gte: startOfYear(date),
      lte: endOfYear(date),
    });

    const salaries = await this.prisma.salary.findMany({
      where: {
        msnv,
        cccd,
        thang: {
          gte: startOfYear(date),
          lte: endOfYear(date),
        },
      },
      select: {
        tien_luong_thuc_linh: true,
      },
    });
    const salary = await this.prisma.salary.findFirst({
      where: {
        msnv,
        cccd,
        thang: {
          gte: startOfMonth(date),
          lte: endOfMonth(date),
        },
      },
      include: {
        salaryNotes: true,
      },
      orderBy: {
        thang: 'desc',
      },
    });
    return { salary, salaries };
  }

  async salaryNote(salariesCreateNoteDto: SalariesCreateNoteDto) {
    return await this.prisma.salaryNote.create({
      data: salariesCreateNoteDto,
    });
  }

  async getSalariesByMonth(month: string) {
    const date = new Date(month);
    const salaries = await this.prisma.salary.findMany({
      where: {
        thang: {
          gte: startOfMonth(date),
          lte: endOfMonth(date),
        },
      },
      include: {
        salaryNotes: true,
      },
      orderBy: [{ thang: 'desc' }, { id: 'desc' }],
    });
    return salaries;
  }
  async sendNotification() {
    const tokens = await this.prisma.fCMToken.findMany({
      select: {
        token: true,
      },
    });
    if (tokens.length > 0)
      await this.firebaseService.sendToMultipleDevices(
        tokens.map((t) => t.token),
        {
          title: 'Công ty may Hòa Thọ Đông Hà',
          body: 'Đã có thông tin lương tháng ' + format(new Date(), 'MM/yyyy'),
          link: 'https://hoathodongha.vercel.app/tao-don/luong',
        },
      );
  }
  async findOne(id: string) {
    return await this.prisma.salary.findUnique({
      where: { id },
      include: {
        salaryNotes: true,
      },
    });
  }

  async getSalariesFeedback(month: string) {
    const date = new Date(month);

    const salaries = await this.prisma.salary.findMany({
      where: {
        salaryNotes: {
          some: {
            done: false,
          },
        },
        thang: {
          gte: startOfMonth(date),
          lte: endOfMonth(date),
        },
      },
      include: {
        salaryNotes: true,
        // id: true,
        // msnv: true,
        // hoten: true,
        // to: true,
      },
      orderBy: [{ thang: 'desc' }, { id: 'asc' }],
    });
    console.log(
      '🚀 ~ SalariesService ~ getSalariesFeedback ~ salaries:',
      salaries,
    );
    return await this.prisma.salary.findMany({
      where: {
        thang: {
          gt: startOfMonth(date),
          lte: endOfMonth(date),
        },
        salaryNotes: { some: {} },
      },
    });
  }
}
