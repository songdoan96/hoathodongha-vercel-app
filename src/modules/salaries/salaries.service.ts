import { Injectable, NotFoundException } from '@nestjs/common';
import { endOfMonth, startOfMonth } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { SalariesCheckDto, SalariesCreateNoteDto } from './salaries.dto';

@Injectable()
export class SalariesService {
  constructor(private readonly prisma: PrismaService) {}
  async upfile(rows: any, body: any) {
    const data = rows.map((item) => ({
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
    const salary = await this.prisma.salary.findFirst({
      where: {
        msnv: salariesCheckDto.msnv,
        cccd: salariesCheckDto.cccd,
      },
      orderBy: { id: 'desc' },
    });

    if (!salary)
      throw new NotFoundException('Không tìm thấy thông tin tra cứu');
    return salary;
  }

  async details(msnv: string, cccd: string, month: string) {
    const date = new Date(month);
    const salary = await this.prisma.salary.findFirst({
      where: {
        msnv,
        cccd,
        thang: {
          gt: startOfMonth(date),
          lte: endOfMonth(date),
        },
      },
      orderBy: [{ thang: 'desc' }, { id: 'desc' }],
    });
    if (!salary) return { salary: null, note: [] };
    const note = await this.prisma.salaryNote.findMany({
      where: {
        salaryId: salary?.id,
      },
    });
    return {
      salary,
      note,
    };
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
          gt: startOfMonth(date),
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
}
