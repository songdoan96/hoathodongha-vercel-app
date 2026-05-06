import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async create(data: Prisma.FeedbackCreateInput) {
    return await this.prisma.feedback.create({ data });
  }
}
