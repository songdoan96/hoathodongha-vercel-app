/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOvertimesDto } from './overtimes.dto';

@Injectable()
export class OvertimesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.overtime.findMany({
      orderBy: [{ id: 'desc' }],
    });
  }
  async findOne(id: string) {
    return await this.prisma.overtime.findUnique({ where: { id } });
  }

  async create(data: CreateOvertimesDto) {
    return await this.prisma.overtime.create({
      data,
    });
  }
}
