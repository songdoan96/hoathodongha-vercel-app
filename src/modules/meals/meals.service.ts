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

  async findAll() {
    return await this.prisma.meal.findMany();
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
}
