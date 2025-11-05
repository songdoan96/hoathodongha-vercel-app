import { Injectable } from '@nestjs/common';
import { Form } from '../../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

interface AccountType {
  username: string;
  name: string;
  password: string;
  bophan: string;
}
interface EmployeeType {
  msnv: string;
  hoten: string;
  bophan: string;
  active: boolean;
}

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}
  async index() {
    // await this.seedAccount();
    // await this.seedEmployee();
    // await this.formEmployee();
  }

  async seedAccount() {
    const res = await fetch('http://172.17.0.30:8888/api/auth');
    const data: AccountType[] = await res.json();
    await this.prisma.user.deleteMany();
    for (const account of data) {
      await this.prisma.user.create({
        data: {
          username: account.username,
          password: account.password,
          name: account.name,
          bophan: account.bophan,
        },
      });
    }
  }

  async seedEmployee() {
    const res = await fetch('http://172.17.0.30:8888/api/employee');
    const data: EmployeeType[] = await res.json();
    await this.prisma.employee.deleteMany();
    for (const employee of data) {
      await this.prisma.employee.create({
        data: {
          msnv: employee.msnv,
          hoten: employee.hoten,
          bophan: employee.bophan,
          active: employee.active,
        },
      });
    }
  }
  async formEmployee() {
    const res = await fetch('http://172.17.0.30:8888/api/form');
    const data: Form[] = await res.json();
    // await this.prisma.form.deleteMany();
    for (const form of data.reverse()) {
      const { id, ...rest } = form;
      await this.prisma.form.create({
        data: {
          ...rest,
        },
      });
    }
    return await this.prisma.form.findMany();
  }
}
