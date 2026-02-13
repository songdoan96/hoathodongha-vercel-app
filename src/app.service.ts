import { Injectable } from '@nestjs/common';
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
} from 'date-fns';
@Injectable()
export class AppService {
  getHello() {
    // await this.prisma.employee.updateMany({
    //   data: {
    //     active: false,
    //   },
    // });
    // // const salaries = await this.prisma.salary.findMany();
    // // for (const salary of salaries) {
    // //   const findEmployee = await this.prisma.employee.findFirst({
    // //     where: {
    // //       msnv: salary.msnv,
    // //     },
    // //   });
    // //   const fcmToken = await this.prisma.fCMToken.findFirst({
    // //     where: {
    // //       msnv: salary.msnv,
    // //     },
    // //   });
    // //   if (findEmployee) {
    // //     await this.prisma.employee.update({
    // //       where: {
    // //         msnv: salary.msnv,
    // //       },
    // //       data: {
    // //         active: true,
    // //         fcm_token: fcmToken?.token,
    // //         cccd: salary.cccd,
    // //       },
    // //     });
    // //   } else {
    // //     await this.prisma.employee.create({
    // //       data: {
    // //         active: true,
    // //         fcm_token: fcmToken?.token,
    // //         cccd: salary.cccd,
    // //         msnv: salary.msnv,
    // //         hoten: salary.hoten,
    // //         bophan: salary.to,
    // //       },
    // //     });
    // //   }
    // }
    console.log({
      startOfMonth: startOfMonth(new Date('2026-02')),
      endOfMonth: endOfMonth(new Date('2026-02')),
      startOfYear: startOfYear(new Date('2026-02')),
      endOfYear: endOfYear(new Date('2026-02')),
      startOfDay: startOfDay(new Date()),
      endOfDay: endOfDay(new Date()),
      date: new Date(),
      format: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    });

    return {
      startOfMonth: startOfMonth(new Date('2026-02')),
      endOfMonth: endOfMonth(new Date('2026-02')),
      startOfYear: startOfYear(new Date('2026-02')),
      endOfYear: endOfYear(new Date('2026-02')),
      startOfDay: startOfDay(new Date()),
      endOfDay: endOfDay(new Date()),
      date: new Date(),
      format: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
  }
}
