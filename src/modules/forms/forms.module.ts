/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
