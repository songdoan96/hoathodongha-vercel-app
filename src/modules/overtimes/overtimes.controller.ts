import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma';
import { CreateOvertimesDto } from './overtimes.dto';
import { OvertimesService } from './overtimes.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('overtimes')
export class OvertimesController {
  constructor(private readonly overtimesService: OvertimesService) {}

  @Get()
  findAll() {
    return this.overtimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overtimesService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOvertimesDto) {
    return this.overtimesService.create(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.OvertimeUpdateInput) {
    return this.overtimesService.update(id, data);
  }
}
