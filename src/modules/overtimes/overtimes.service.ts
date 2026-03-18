/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOvertimesDto } from './overtimes.dto';
import { Prisma } from '../../../generated/prisma';

@Injectable()
export class OvertimesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const overtimes = await this.prisma.overtime.findMany({
      orderBy: [{ id: 'desc' }],
    });
    const result: any = [];
    for (const overtime of overtimes) {
      result.push({
        ...overtime,
        employees: await this.prisma.employee.findMany({
          where: {
            id: { in: overtime.danhsach },
          },
        }),
      });
    }
    return result;
  }
  async findOne(id: string) {
    const overtime = await this.prisma.overtime.findFirst({ where: { id } });
    return {
      ...overtime,
      employees: await this.prisma.employee.findMany({
        where: {
          id: { in: overtime?.danhsach },
        },
      }),
    };
  }

  async create(data: CreateOvertimesDto) {
    return await this.prisma.overtime.create({
      data,
    });
  }

  async update(id: string, data: Prisma.OvertimeUpdateInput) {
    return await this.prisma.overtime.update({
      where: { id },
      data,
    });
  }
}
