import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeCreateDto, EmployeeUpdateDto } from './employees.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/find-staff-id')
  async findByMsnv(@Query('msnv') msnv: string) {
    return await this.employeesService.findByMsnv(msnv);
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
}
