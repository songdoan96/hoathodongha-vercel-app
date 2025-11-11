/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';

@Module({
  imports: [],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
