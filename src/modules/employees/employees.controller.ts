import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeCreateDto, EmployeeUpdateDto } from './employees.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { read, utils } from 'xlsx';
import { EmployeeExcelUploadType } from './employees.type';
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/find-staff-id')
  async findByMsnv(@Query('msnv') msnv: string) {
    return await this.employeesService.findByMsnv(msnv);
  }
  @Get('/find-with-line')
  async findByLine(@Query('line') line: string) {
    return await this.employeesService.findByLine(line);
  }
  @Get('')
  async findAll() {
    return await this.employeesService.findAll();
  }
  @Get(':id')
  async findOne(@Query('id') id: string) {
    return await this.employeesService.findOne(id);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.employeesService.remove(id);
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() employeeUpdateDto: EmployeeUpdateDto,
  ) {
    return await this.employeesService.update(id, employeeUpdateDto);
  }

  @Post()
  async create(@Body() employee: EmployeeCreateDto) {
    return await this.employeesService.create(employee);
  }

  @Post('upload/file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    const workbook = read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: EmployeeExcelUploadType[] = utils.sheet_to_json(sheet);
    return this.employeesService.uploadExcel(rows);
  }
}
