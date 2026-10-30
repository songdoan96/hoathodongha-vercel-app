import { Injectable, StreamableFile } from '@nestjs/common';
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from 'date-fns';
import { utils, write } from 'xlsx';
import { linesListFilterSortName } from '../../lib/constant';
import { PrismaService } from '../prisma/prisma.service';
import { MealsCreateDto, MealsUpdateNextDayDto } from './meals.dto';
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
  async create(data: MealsCreateDto) {
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

  async findMealNextDay() {
    const today = new Date();

    return await this.prisma.meal.findMany({
      where: {
        ngay: {
          gt: today,
          lte: addDays(today, 14),
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
  async updateNextDay(formData: MealsUpdateNextDayDto) {
    //30/10 add MealsUpdateNextDayDto
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
          thirdQty: +formData.thirdQty,
        },
      });
    }
    return await this.prisma.mealLine.create({
      data: {
        firstQty: +formData.firstQty,
        secondQty: +formData.secondQty,
        thirdQty: +formData.thirdQty,
        bophan: formData.bophan,
        mealId: formData.id,
      },
    });
  }

  async exportData(month: string) {
    const firstDate = new Date(month);

    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(firstDate),
      end: endOfMonth(firstDate),
    });
    const row1: string = 'CHI TIẾT ĂN SÁNG ' + month;
    const row2 = daysInMonth.map((day) => format(day, 'dd/MM'));
    const rows: (string | number | undefined)[][] = [];
    const mealLines = await this.prisma.mealLine.findMany({
      where: {
        meal: {
          ngay: {
            gt: startOfMonth(firstDate),
            lte: endOfMonth(firstDate),
          },
        },
      },
      include: {
        meal: true,
      },
    });

    for (const line of linesListFilterSortName) {
      const qty: (string | number | undefined)[] = [];
      for (const day of daysInMonth) {
        const findMealLineDay = mealLines.find(
          (ml) => ml.bophan === line.value && isSameDay(ml.meal.ngay, day),
        );
        const q = findMealLineDay
          ? findMealLineDay.firstQty * 3 +
            +findMealLineDay.secondQty *
              (findMealLineDay?.meal.isSpecial ? 4 : 3) +
            +(findMealLineDay.thirdQty || 0)
          : '';
        qty.push(q);
      }
      rows.push([line.sortName, ...qty]);
    }

    const ws = utils.aoa_to_sheet([[row1], ['TỔ', ...row2], ...rows]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
    return new StreamableFile(buf);
  }
}
