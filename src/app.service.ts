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
