/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { fi } from 'date-fns/locale';
import { endOfMonth, startOfMonth } from 'date-fns';

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
}
