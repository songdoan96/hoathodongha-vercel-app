import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}
  async findEmployee(msnv: string) {
    return await this.prisma.employee.findMany({
      where: { msnv: { startsWith: msnv } },
    });
  }
}
