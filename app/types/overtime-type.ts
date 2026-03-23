export interface OvertimeType {
  id: string;
  bophan: string;
  ngay: string;
  gio: string;
  lydo: string;
  danhsach: OvertimeEmployee[];
  totruong: string;
  quandoc: string | null;
  lanhdao: string | null;
  createdAt: Date;
  status: boolean;
}
export interface OvertimeEmployee {
  msnv: string;
  hoten: string;
  status: boolean;
}
