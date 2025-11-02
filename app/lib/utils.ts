import { clsx, type ClassValue } from "clsx";
import { differenceInSeconds, isAfter, isBefore, isWithinInterval } from "date-fns";
import { twMerge } from "tailwind-merge";
import useAuthStore from "~/stores/auth-store";
import type { KcType } from "~/types/kcs.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
function todayAt(hour: number, minute = 0, second = 0, currentTime: Date) {
  return new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    hour,
    minute,
    second
  );
}

export function calculatorTargetNow(chitieungay?: number) {
  if (chitieungay) {
    const currentTime = new Date();
    const totalHour = 8.5;

    const morningStart = todayAt(7, 30, 0, currentTime);
    const lunchStart = todayAt(11, 30, 0, currentTime);
    const lunchEnd = todayAt(12, 30, 0, currentTime);
    const afternoonStart = todayAt(17, 0, 0, currentTime);

    let totalSeconds = 0;

    if (isBefore(currentTime, morningStart)) {
      totalSeconds = 0;
    } else if (isWithinInterval(currentTime, { start: morningStart, end: lunchStart })) {
      totalSeconds = differenceInSeconds(currentTime, morningStart);
    } else if (isWithinInterval(currentTime, { start: lunchStart, end: lunchEnd })) {
      totalSeconds = 4 * 60 * 60;
    } else if (isWithinInterval(currentTime, { start: lunchEnd, end: afternoonStart })) {
      totalSeconds = differenceInSeconds(currentTime, morningStart) - 3600;
    } else if (isAfter(currentTime, afternoonStart)) {
      totalSeconds = totalHour * 3600;
    }

    const ndsx = (totalHour * 3600) / chitieungay;
    return Math.ceil(totalSeconds / ndsx);
  }
}

export function calculatorAchieveRate(kcs: KcType) {
  if (kcs.chitieungay && kcs.chitieungay != 0) {
    return Number((kcs.sldat / kcs.chitieungay) * 100);
  }
  return 0;
}
export function calculatorDefectRate(kcs: KcType) {
  if (kcs.sldat != 0 || kcs.slloi != 0) {
    return Number((kcs.slloi / (kcs.sldat + kcs.slloi)) * 100);
  }
  return 0;
}
