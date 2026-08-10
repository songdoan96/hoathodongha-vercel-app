import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoodsCreateDto } from './goods.dto';

@Injectable()
export class GoodsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(goodsCreateDto: GoodsCreateDto) {
    return await this.prismaService.goodsOut.create({ data: goodsCreateDto });
  }

  async findAll() {
    await this.prismaService.goodsOut.findMany({
      where: {
        baove: { equals: null },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
}
