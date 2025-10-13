import { isAfter, isBefore, parse } from 'date-fns';

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
