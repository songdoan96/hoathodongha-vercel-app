import {
  differenceInMinutes,
  isAfter,
  isBefore,
  max,
  min,
  parse,
} from 'date-fns';

export function isAfter17h() {
  return timeAfter('17:00:00');
}
export function timeAfter(time: string) {
  const now = new Date();
  const timeCheck = parse(time, 'HH:mm:ss', now);
  return isAfter(now, timeCheck);
}
export function timeBefore(time: string) {
  const now = new Date();
  const timeCheck = parse(time, 'HH:mm:ss', now);
  return isBefore(now, timeCheck);
}
export function diffHoursOut(start: string, end?: string) {
  const format = 'HH:mm';

  const endTime = end && end.trim() !== '' ? end : '17:00';

  const baseDate = new Date();

  const dStart = parse(start, format, baseDate);
  const dEnd = parse(endTime, format, baseDate);

  const breakStart = parse('11:30', format, baseDate);
  const breakEnd = parse('12:30', format, baseDate);

  let totalMinutes = differenceInMinutes(dEnd, dStart);

  const intersectStart = max([dStart, breakStart]);
  const intersectEnd = min([dEnd, breakEnd]);

  const breakMinutes = differenceInMinutes(intersectEnd, intersectStart);

  if (breakMinutes > 0) {
    totalMinutes -= breakMinutes;
  }

  return totalMinutes / 60;
}
