import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { GoodsCreateDto } from './goods.dto';
import { GoodsService } from './goods.service';
import { AuthGuard } from '../../guards/auth.guard';

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

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('signature/:id')
  signature(
    @Param('id') id: string,
    @Body() signatureFormDto: { ten: string; chucvu: string },
  ) {
    return this.goodsService.signature(id, signatureFormDto);
  }

  @Patch('security-signature/:id')
  securitySignature(
    @Param('id') id: string,
    @Body() signatureFormDto: { ten: string },
  ) {
    return this.goodsService.securitySignature(id, signatureFormDto);
  }
}
