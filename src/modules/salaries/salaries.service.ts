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
    const month = new Date(body.month);
    const data: Salary[] = [];
    for (const item of rows) {
      const msnv = String(item.msnv).replace(/dh/gi, '');
      const cccd = String(item.cccd);
      const employee = await this.prisma.employee.findUnique({
        where: {
          msnv,
          // cccd,
        },
      });
      if (!employee)
        await this.prisma.employee.create({
          data: { msnv, cccd, hoten: item.hoten, bophan: item.to },
        });
      data.push({
        ...item,
        thang: month,
        cccd,
        msnv,
      });
      await this.prisma.salary.create({
        data: {
          ...item,
          thang: month,
          cccd,
          msnv,
        },
      });
    }

    // const data = rows.map((item: Salary) => ({
    //   ...item,
    //   thang: month,
    //   cccd: String(item.cccd),
    //   msnv: String(item.msnv).replace(/dh/gi, ''),
    // }));
    // return await this.prisma.salary.createMany({
    //   data,
    // });
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
      select: { msnv: true, cccd: true, hoten: true, to: true },
    });

    if (!salary)
      throw new NotFoundException('Không tìm thấy thông tin tra cứu');
    if (token) {
      await this.prisma.employee.upsert({
        where: { msnv },
        update: { fcm_token: token },
        create: {
          msnv,
          cccd,
          fcm_token: token,
          hoten: salary.hoten,
          bophan: salary.to,
        },
      });
    }

    return salary;
  }

  async details(msnv: string, cccd: string, month: string) {
    const date = new Date(month);

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

  async salaryChat(salariesCreateNoteDto: SalariesCreateNoteDto) {
    const salaryNote = await this.prisma.salaryNote.create({
      data: salariesCreateNoteDto,
    });
    if (!salariesCreateNoteDto.isEmployee) {
      const salary = await this.prisma.salary.findFirst({
        where: {
          id: salariesCreateNoteDto.salaryId,
        },
      });
      if (salary) {
        const employee = await this.prisma.employee.findFirst({
          where: {
            msnv: salary.msnv,
          },
        });
        if (employee?.fcm_token) {
          await this.firebaseService.sendToDevice(employee.fcm_token, {
            title: 'Kế toán Hòa Thọ Đông Hà',
            body: salariesCreateNoteDto.chat,
            link: 'https://hoathodongha.vercel.app/tao-don/luong',
          });
        }
      }
    }
    return salaryNote;
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
    const employees = await this.prisma.employee.findMany({
      where: {
        fcm_token: { not: null },
      },
      select: { fcm_token: true },
    });
    const tokens = employees.map((employee) => employee.fcm_token || '');
    await this.firebaseService.sendToMultipleDevices(tokens, {
      title: 'Công ty may Hòa Thọ Đông Hà',
      body: 'Đã có thông tin lương tháng ' + format(new Date(), 'MM/yyyy'),
      link: 'https://hoathodongha.vercel.app/tao-don/luong',
    });
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
    return await this.prisma.salary.findMany({
      where: {
        thang: {
          gte: startOfMonth(date),
          lte: endOfMonth(date),
        },
        salaryNotes: { some: {} },
      },
      include: {
        salaryNotes: true,
      },
    });
  }
}
