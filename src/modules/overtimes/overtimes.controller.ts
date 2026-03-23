import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  findAll(@Query('month') month: string) {
    return this.overtimesService.findAll(month);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overtimesService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOvertimesDto) {
    return this.overtimesService.create(data);
  }

  // @UseGuards(AuthGuard)
  // Prisma.OvertimeUpdateInput
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.overtimesService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.overtimesService.remove(id);
  }
}
