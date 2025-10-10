import type { EmployeeType } from "./employee";

export interface OvertimeType {
  id: number;
  bophan: string;
  ngay: string;
  thoigian: string;
  lydo?: string;
  totruong: string;
  danhsach: string;
  kynhan?: string;
  ghichu?: string;
  trangthai: "pending" | "accept" | "reject";
  comat?: string;
  created_at: Date;
  employees?: EmployeeType[];
}
