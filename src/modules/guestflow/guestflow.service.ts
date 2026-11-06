import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuestFlowCreateDto } from './guestflow.dto';

@Injectable()
export class GuestFlowService {
  constructor(private readonly prisma: PrismaService) {}
  async create(guestFlowCreateDto: GuestFlowCreateDto) {
    return await this.prisma.guestFlow.create({
      data: guestFlowCreateDto,
    });
  }
}
