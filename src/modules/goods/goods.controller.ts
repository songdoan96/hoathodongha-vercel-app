import { Body, Controller, Post, Get } from '@nestjs/common';
import { GoodsCreateDto } from './goods.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Post()
  create(@Body() goodsCreateDto: GoodsCreateDto) {
    return this.goodsService.create(goodsCreateDto);
  }

  @Get()
  findAll() {
    return this.goodsService.findAll();
  }
}
