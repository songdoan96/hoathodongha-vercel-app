import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { read, utils } from 'xlsx';
import { Salary } from '../../../generated/prisma';
import { SalariesCheckDto, SalariesCreateNoteDto } from './salaries.dto';
import { SalariesService } from './salaries.service';
@Controller('salaries')
export class SalariesController {
  constructor(private readonly salariesService: SalariesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { month: string },
  ) {
    const workbook = read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: Salary[] = utils.sheet_to_json(sheet);
    return this.salariesService.upfile(rows, body);
  }

  @Post('check')
  async checkSalary(@Body() salariesCheckDto: SalariesCheckDto) {
    return this.salariesService.checkSalary(salariesCheckDto);
  }

  @Get('file-download')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), 'public', 'templates', 'file-luong.xlsx'),
    );
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="file-luong.xlsx"',
    });

    return new StreamableFile(file);
  }

  @Get('details')
  monthDetails(
    @Query('msnv') msnv: string,
    @Query('cccd') cccd: string,
    @Query('month') month: string,
  ) {
    return this.salariesService.details(msnv, cccd, month);
  }

  @Post('chat')
  async salaryNote(@Body() salariesCreateNoteDto: SalariesCreateNoteDto) {
    return this.salariesService.salaryChat(salariesCreateNoteDto);
  }

  @Get('get-by-month')
  async getSalariesByMonth(@Query('month') month: string) {
    return this.salariesService.getSalariesByMonth(month);
  }

  @Post('send-notification')
  async sendNotification() {
    return this.salariesService.sendNotification();
  }

  @Get('check/feedback')
  async getSalariesFeedback(@Query('month') month: string) {
    return this.salariesService.getSalariesFeedback(month);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salariesService.findOne(id);
  }
}
