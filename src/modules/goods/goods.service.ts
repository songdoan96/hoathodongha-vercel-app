import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoodsCreateDto } from './goods.dto';
import { startOfMonth } from 'date-fns';

@Injectable()
export class GoodsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(goodsCreateDto: GoodsCreateDto) {
    return await this.prismaService.goodsOut.create({
      data: {
        ...goodsCreateDto,
        tungay: new Date(goodsCreateDto.tungay),
        denngay: new Date(goodsCreateDto.denngay),
      },
    });
  }
  async findOne(id: string) {
    return await this.prismaService.goodsOut.findUnique({ where: { id } });
  }

  async findAll() {
    return await this.prismaService.goodsOut.findMany({
      where: {
        // baove: undefined,
        createdAt: {
          gte: startOfMonth(new Date()),
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }
  async securityFindAll() {
    return await this.prismaService.goodsOut.findMany({
      where: {
        createdAt: {
          gte: startOfMonth(new Date()),
        },
      },
      orderBy: [{ baoveTime: 'asc' }, { id: 'desc' }],
    });
  }
  async signature(id: string, formDto: { ten: string; chucvu: string }) {
    const { ten, chucvu } = formDto;
    return await this.prismaService.goodsOut.update({
      where: { id },
      data: { [chucvu]: ten },
    });
  }
  async securitySignature(id: string, formDto: { ten: string }) {
    const { ten } = formDto;
    return await this.prismaService.goodsOut.update({
      where: { id },
      data: { baove: ten, baoveTime: new Date() },
    });
  }
}
