import { Controller, Get, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('/find-staff-id')
  async findEmployee(@Query('msnv') msnv: string) {
    return await this.employeesService.findEmployee(msnv);
  }
}
