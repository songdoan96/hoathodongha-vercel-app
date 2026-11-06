import { Module } from '@nestjs/common';
import { GuestFlowController } from './guestflow.controller';
import { GuestFlowService } from './guestflow.service';

@Module({
  imports: [],
  controllers: [GuestFlowController],
  providers: [GuestFlowService],
})
export class GuestFlowModule {}
