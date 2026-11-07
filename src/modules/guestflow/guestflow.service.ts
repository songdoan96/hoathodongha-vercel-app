import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuestFlowCreateDto, GuestFlowOutCreateDto } from './guestflow.dto';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class GuestFlowService {
  constructor(private readonly prisma: PrismaService) {}
  async create(guestFlowCreateDto: GuestFlowCreateDto) {
    return await this.prisma.guestFlow.create({
      data: guestFlowCreateDto,
    });
  }

  async findAll(date?: string) {
    const dateFilter = date ? new Date(date) : new Date();
    return await this.prisma.guestFlow.findMany({
      where: {
        createdAt: {
          gt: startOfDay(dateFilter),
          lte: endOfDay(dateFilter),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        guestFlowOuts: {
          orderBy: {
            giora: 'desc',
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.guestFlow.findUnique({
      where: { id },
      include: { guestFlowOuts: true },
    });
  }

  async createOut(guestFlowOutCreateDto: GuestFlowOutCreateDto) {
    return await this.prisma.guestFlowOut.create({
      data: guestFlowOutCreateDto,
    });
  }
}
