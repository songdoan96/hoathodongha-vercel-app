import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { utils, write } from 'xlsx';
import { CreateFormDto, SignatureFormDto, UpdateFormDto } from './form.dto';
import { FormService } from './form.service';
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @Get()
  findAll(@Query('type') type?: string, @Query('value') value?: string) {
    return this.formService.findAll({
      type,
      value,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }

  @Patch('signature/:id')
  signature(
    @Param('id') id: string,
    @Body() signatureFormDto: SignatureFormDto,
  ) {
    return this.formService.signature(id, signatureFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(id);
  }

  @Get('/security/get-go-out')
  securityGetGoOut() {
    return this.formService.securityGetGoOut();
  }

  @Get('/organization/export')
  async organizationExport(@Res() res: Response, @Query('date') date: string) {
    const fileName =
      date === 'leave' ? 'Giay-Phep' : date === 'goout' ? `Ra-Cong` : date;
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}.xlsx"`,
    );
    const data = await this.formService.organizationExport(date);
    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, fileName);
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    return res.send(buf);
  }
}
