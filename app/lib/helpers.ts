import { isAfter, isBefore, parse } from "date-fns";
import type { KcType } from "~/types/kcs.type";
import type { PlanType } from "~/types/plan.type";
export function isAfter17h() {
  const now = new Date();
  const fivePM = parse("17:00:00", "HH:mm:ss", now);
  return isAfter(now, fivePM);
}
export function timeAfter(time: string, nowDate?: Date) {
  const now = nowDate || new Date();
  const timeCheck = parse(time, "HH:mm:ss", now);
  return isAfter(now, timeCheck);
}
export function timeBefore(time: string, nowDate?: Date) {
  const now = nowDate || new Date();
  const timeCheck = parse(time, "HH:mm:ss", now);
  return isBefore(now, timeCheck);
}
export function calculatorBtps(plan: PlanType) {
  if (plan.btps) {
    return (
      plan.btps
        .flatMap((btp) => btp?.BTPDay?.map((btpDay) => btpDay.slcap))
        .reduce((a, b) => (a || 0) + (b || 0), 0) || 0
    );
  }
  return 0;
}
export function calculatorRemaining(kcs: KcType) {
  // const sumBtpCap = calculatorBtps(kcs.plan);
  // return Math.abs((sumBtpCap - kcs.nhaphoanthanh || kcs.plan.nhaphoanthanh) / kcs.chitieungay);
  return Math.abs((kcs.btpcap - kcs.nhaphoanthanh || kcs.plan.nhaphoanthanh) / kcs.chitieungay);
}
export function convertWeatherDescription(code: number) {
  const weatherDescriptions: Record<number, string> = {
    0: "Trời quang đãng",
    1: "Hầu như quang đãng",
    2: "Có mây rải rác",
    3: "Nhiều mây",
    45: "Sương mù",
    48: "Sương mù",
    51: "Mưa phùn nhẹ",
    53: "Mưa phùn vừa",
    55: "Mưa phùn dày",
    56: "Mưa phùn đóng băng nhẹ",
    57: "Mưa phùn đóng băng dày",
    61: "Mưa nhẹ",
    63: "Mưa vừa",
    65: "Mưa to",
    66: "Mưa đóng băng nhẹ",
    67: "Mưa đóng băng dày",
    71: "Tuyết nhẹ",
    73: "Tuyết vừa",
    75: "Tuyết dày",
    77: "Hạt tuyết",
    80: "Mưa rào nhẹ",
    81: "Mưa rào vừa",
    82: "Mưa rào lớn",
    85: "Mưa tuyết nhẹ",
    86: "Mưa tuyết lớn",
    95: "Dông",
    96: "Dông kèm mưa đá nhẹ",
    99: "Dông kèm mưa đá lớn",
  };
  return weatherDescriptions[code] || "Không xác định";
}
export function convertWeatherIcon(code: number, isNight: number) {
  const night = isNight === 1 ? "n" : "d";
  const map: Record<number, string> = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    45: "50",
    48: "50",
    51: "09",
    53: "09",
    55: "09",
    61: "10",
    63: "10",
    65: "10",
    66: "10",
    67: "10",
    71: "13",
    73: "13",
    75: "13",
    77: "13",
    80: "09",
    81: "09",
    82: "09",
    85: "13",
    86: "13",
    95: "11",
    96: "11",
    99: "11",
  };
  const prefix = map[code] || "01";
  return prefix + night;
}
