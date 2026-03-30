import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
