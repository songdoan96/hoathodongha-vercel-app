import { SalariesController } from './salaries.controller';
import { SalariesService } from './salaries.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SalariesController],
  providers: [SalariesService],
})
export class SalariesModule {}
