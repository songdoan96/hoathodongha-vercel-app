import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOvertimesDto } from './overtimes.dto';
import { Prisma } from '../../../generated/prisma';

@Injectable()
export class OvertimesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.overtime.findMany({
      orderBy: [{ id: 'desc' }],
    });
  }
  async findOne(id: string) {
    return await this.prisma.overtime.findFirst({ where: { id } });
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
