import { Module } from '@nestjs/common';
import { SalariesController } from './salaries.controller';
import { SalariesService } from './salaries.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [SalariesController],
  providers: [SalariesService],
})
export class SalariesModule {}
