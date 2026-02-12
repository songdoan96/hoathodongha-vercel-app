import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeCreateDto, EmployeeUpdateDto } from './employees.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}
  async findEmployee(msnv: string) {
    return await this.prisma.employee.findMany({
      where: { msnv: { startsWith: msnv } },
    });
  }
  async findAll() {
    return await this.prisma.employee.findMany({
      orderBy: [{ active: 'desc' }, { msnv: 'asc' }],
    });
  }
  async create(employee: EmployeeCreateDto) {
    return await this.prisma.employee.create({ data: employee });
  }
  async findOne(id: string) {
    return await this.prisma.employee.findUnique({ where: { id } });
  }
  async remove(id: string) {
    return await this.prisma.employee.delete({ where: { id } });
  }
  async update(id: string, employeeUpdateDto: EmployeeUpdateDto) {
    return await this.prisma.employee.update({
      where: { id },
      data: employeeUpdateDto,
    });
  }
}
