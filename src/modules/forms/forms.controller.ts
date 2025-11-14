import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Post,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto, SignatureFormDto, UpdateFormDto } from './forms.dto';
import { utils, write } from 'xlsx';
import { type Response } from 'express';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }

  @Get()
  findAll(
    @Query('month') month: string,
    @Query('cursor') cursor?: string,
    @Query('type') type?: string,
    @Query('value') value?: string,
  ) {
    return this.formsService.findAll({ month, cursor, type, value });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(id, updateFormDto);
  }

  @Patch('security-update-time/:id')
  securityUpdate(
    @Param('id') id: string,
    @Body() updateFormDto: UpdateFormDto,
  ) {
    return this.formsService.update(id, updateFormDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Patch('signature/:id')
  signature(
    @Param('id') id: string,
    @Body() signatureFormDto: SignatureFormDto,
  ) {
    return this.formsService.signature(id, signatureFormDto);
  }

  @Get('/security/get-go-out')
  securityGetGoOut() {
    return this.formsService.securityGetGoOut();
  }

  @Get('/organization/export')
  async organizationExport(@Res() res: Response, @Query('date') date: string) {
    const fileName =
      date === 'leave' ? 'Giay-Phep' : date === 'goout' ? `Ra-Cong` : date;
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}.xlsx"`,
    );
    const data = await this.formsService.organizationExport(date);
    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, fileName);
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    return res.send(buf);
  }
}
