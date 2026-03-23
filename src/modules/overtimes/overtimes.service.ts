import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOvertimesDto } from './overtimes.dto';
import { Prisma } from '../../../generated/prisma';
import { endOfMonth, startOfMonth } from 'date-fns';

@Injectable()
export class OvertimesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(month: string) {
    return await this.prisma.overtime.findMany({
      where: {
        createdAt: {
          gte: startOfMonth(month),
          lte: endOfMonth(month),
        },
      },
      orderBy: [{ id: 'desc' }],
    });
  }
  async findOne(id: string) {
    return await this.prisma.overtime.findFirst({ where: { id } });
  }

  async create(data: CreateOvertimesDto) {
    return await this.prisma.overtime.create({
      data: {
        ...data,
        tungay: new Date(data.tungay),
        denngay: new Date(data.denngay),
      },
    });
  }

  async update(id: string, data: any) {
    console.log('🚀 ~ OvertimesService ~ update ~ data:', data);
    return await this.prisma.overtime.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.overtime.delete({ where: { id } });
  }
}
