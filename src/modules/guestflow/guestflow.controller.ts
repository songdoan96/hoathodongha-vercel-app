import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GuestFlowCreateDto, GuestFlowOutCreateDto } from './guestflow.dto';
import { GuestFlowService } from './guestflow.service';

@Controller('guestflow')
export class GuestFlowController {
  constructor(private readonly guestFlowService: GuestFlowService) {}

  @Post()
  create(@Body() guestFlowCreateDto: GuestFlowCreateDto) {
    return this.guestFlowService.create(guestFlowCreateDto);
  }

  @Get()
  findAll(@Query('date') date: string) {
    return this.guestFlowService.findAll(date);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestFlowService.findOne(id);
  }

  @Post('out')
  createOut(@Body() guestFlowOutCreateDto: GuestFlowOutCreateDto) {
    return this.guestFlowService.createOut(guestFlowOutCreateDto);
  }
}
