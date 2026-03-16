import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOvertimesDto } from './overtimes.dto';
import { OvertimesService } from './overtimes.service';

@Controller('overtimes')
export class OvertimesController {
  constructor(private readonly overtimesService: OvertimesService) {}

  @Get()
  findAll() {
    return this.overtimesService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.overtimesService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOvertimesDto) {
    return this.overtimesService.create(data);
  }
}
