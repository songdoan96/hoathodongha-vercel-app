import { Injectable } from '@nestjs/common';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';
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
}
