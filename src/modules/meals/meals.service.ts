import { Injectable, StreamableFile } from '@nestjs/common';
import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
import { utils, write } from 'xlsx';
import { linesListFilterSortName } from '../../lib/constant';
@Injectable()
export class MealsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(month: string) {
    return await this.prisma.meal.findMany({
      where: {
        ngay: {
          gte: startOfMonth(new Date(month)),
          lte: endOfMonth(new Date(month)),
        },
      },
      include: { mealLines: true },
      orderBy: { ngay: 'asc' },
    });
  }
  async findOne(id: string) {
    return await this.prisma.meal.findUnique({ where: { id } });
  }
  async create(data: any) {
    const { ngay, ...formData } = data;
    const findDay = await this.prisma.meal.findFirst({
      where: {
        ngay: new Date(ngay),
      },
    });
    if (findDay) {
      return await this.prisma.meal.update({
        where: { id: findDay.id },
        data: formData,
      });
    }
    return await this.prisma.meal.create({
      data: {
        ngay: new Date(ngay),
        ...formData,
      },
    });
  }

  async lineFindAll() {
    return await this.prisma.meal.findMany({
      where: {
        ngay: {
          gte: startOfMonth(new Date()),
          lte: endOfMonth(new Date()),
        },
      },
      include: { mealLines: true },
    });
  }

  async findMealNextDay(bophan: string) {
    // const meal = await this.prisma.meal.findFirst({
    //   where: {
    //     ngay: {
    //       gt: new Date(),
    //       lte: addDays(new Date(), 1),
    //     },
    //   },
    // });
    // if (!meal) return { mealLine: null, meal };
    // const mealLine = await this.prisma.mealLine.findFirst({
    //   where: {
    //     bophan,
    //     mealId: meal.id,
    //   },
    // });

    // return { mealLine, meal };
    const today = new Date();
    return await this.prisma.meal.findMany({
      where: {
        ngay: {
          gt: today,
          lte: addDays(today, 7),
        },
      },
      include: { mealLines: true },
      orderBy: { ngay: 'asc' },
    });
  }
  async findMealPrintNextDay(day: string) {
    return await this.prisma.meal.findFirst({
      where: {
        ngay: new Date(day),
      },
      include: { mealLines: true },
    });
  }
  async updateNextDay(formData: any) {
    const findMealLine = await this.prisma.mealLine.findFirst({
      where: {
        bophan: formData.bophan,
        mealId: formData.id,
      },
    });
    if (findMealLine) {
      return await this.prisma.mealLine.update({
        where: { id: findMealLine.id },
        data: {
          firstQty: +formData.firstQty,
          secondQty: +formData.secondQty,
        },
      });
    }
    return await this.prisma.mealLine.create({
      data: {
        firstQty: +formData.firstQty,
        secondQty: +formData.secondQty,
        bophan: formData.bophan,
        mealId: formData.id,
      },
    });
    // if (formData.id) {
    //   return await this.prisma.mealLine.update({
    //     where: { id: formData.id },
    //     data: {
    //       firstQty: +formData.firstQty,
    //       secondQty: +formData.secondQty,
    //     },
    //   });
    // }
    // return await this.prisma.mealLine.create({
    //   data: {
    //     firstQty: +formData.firstQty,
    //     secondQty: +formData.secondQty,
    //     bophan: formData.bophan,
    //     mealId: formData.mealId,
    //   },
    // });
  }

  async exportData() {
    const month = '2026-04';
    const bophan = linesListFilterSortName.map((line) => line.sortName);
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(new Date(month)),
      end: endOfMonth(new Date(month)),
    });

    const daysHeader = daysInMonth.map((day) => [format(day, 'dd/MM'), null]);
    console.log('🚀 ~ MealsService ~ exportData ~ daysHeader:', daysHeader);
    const mealsHeader = daysInMonth.map((day) => format(day, 'dd/MM'));

    // var ws = utils.aoa_to_sheet([
    //   ['Bộ phận', ...daysHeader, 'Tổng'],
    //   ['', ...mealsHeader],
    // ]);
    // var wb = utils.book_new();
    // utils.book_append_sheet(wb, ws, month);
    // var buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    const data = [
      ['BỘ PHẬN', ...daysHeader.flatMap((day) => day), 'Tổng'],
      [null, 'Cháo bột vịt', 'Xôi chả', 'Bún chả cá', 'Mì ốp la', null],
      ['1x1', 2, 2, 4, 12, { f: 'SUM(B3:E3)' }],
      ['2x2', 4, 3, 1, 2, { f: 'SUM(B4:E4)' }],
      [
        'Tổng',
        { f: 'SUM(B3:B4)*3' },
        { f: 'SUM(C3:C4)*3' },
        { f: 'SUM(D3:D4)*3' },
        { f: 'SUM(E3:E4)*3' },
        { f: 'SUM(F3:F4)*3' },
      ],
    ];

    // Tạo worksheet
    const ws = utils.aoa_to_sheet(data);

    // Merge cells (giống file của bạn)
    ws['!merges'] = [
      // 01/04 merge 2 cột
      { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } },
      // 02/04 merge 2 cột
      { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } },
      // BỘ PHẬN merge 2 dòng
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      // Tổng merge 2 dòng
      // { s: { r: 0, c: 5 }, e: { r: 1, c: 5 } },
    ];

    // // Set width cột
    // ws['!cols'] = [
    //   { wch: 12 },
    //   { wch: 20 },
    //   { wch: 15 },
    //   { wch: 20 },
    //   { wch: 15 },
    //   { wch: 12 },
    // ];

    // Tạo workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    var buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    return new StreamableFile(buf);
  }
}
