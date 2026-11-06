import { Body, Controller, Post } from '@nestjs/common';
import { GuestFlowCreateDto } from './guestflow.dto';
import { GuestFlowService } from './guestflow.service';

@Controller('guestflow')
export class GuestFlowController {
  constructor(private readonly guestFlowService: GuestFlowService) {}

  @Post()
  create(@Body() guestFlowCreateDto: GuestFlowCreateDto) {
    console.log(
      '🚀 ~ GuestFlowController ~ create ~ guestFlowCreateDto:',
      guestFlowCreateDto,
    );
    return this.guestFlowService.create(guestFlowCreateDto);
  }
}
