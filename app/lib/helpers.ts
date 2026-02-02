import { differenceInMinutes, isAfter, isBefore, max, min, parse, subMinutes } from "date-fns";
import useAuthStore from "~/stores/auth-store";

export function checkRole(role = "admin") {
  if (!useAuthStore.getState().user) {
    return false;
  }
  const bophan = useAuthStore.getState().user?.bophan;
  if (!bophan) {
    return false;
  }
  if (bophan === role || bophan === "admin") {
    return true;
  }
  return false;
}
export function diffHoursOut(start: string, end?: string) {
  const format = "HH:mm";

  const endTime = end && end.trim() !== "" ? end : "17:00";

  const baseDate = new Date();

  const dStart = parse(start, format, baseDate);
  const dEnd = parse(endTime, format, baseDate);

  const breakStart = parse("11:30", format, baseDate);
  const breakEnd = parse("12:30", format, baseDate);

  let totalMinutes = differenceInMinutes(dEnd, dStart);

  const intersectStart = max([dStart, breakStart]);
  const intersectEnd = min([dEnd, breakEnd]);

  const breakMinutes = differenceInMinutes(intersectEnd, intersectStart);

  if (breakMinutes > 0) {
    totalMinutes -= breakMinutes;
  }

  return totalMinutes / 60;
}

export function checkFive5Minutes(time: Date) {
  const createdDate = new Date(time);
  const fiveMinutesAgo = subMinutes(new Date(), 5);
  return isAfter(createdDate, fiveMinutesAgo);
}

export function formatMoney1(money: number) {
  return money.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
export function formatMoney(amount: any) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
