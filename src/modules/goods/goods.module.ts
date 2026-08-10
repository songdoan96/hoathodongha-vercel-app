import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
