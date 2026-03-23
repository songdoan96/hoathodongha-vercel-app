export interface OvertimeType {
  id: string;
  bophan: string;
  // ngay: string;
  gio: string;
  lydo: string;
  danhsach: OvertimeEmployee[];
  totruong: string;
  quandoc: string | null;
  lanhdao: string | null;
  createdAt: Date;
  status: boolean;
  tungay: Date;
  denngay: Date;
}
export interface OvertimeEmployee {
  msnv: string;
  hoten: string;
  // status: boolean;
  days?: OvertimeDayEmployee[];
}

export interface OvertimeDayEmployee {
  day: string;
  status: boolean;
}
