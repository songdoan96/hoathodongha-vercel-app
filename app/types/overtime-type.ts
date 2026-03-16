export interface OvertimeType {
  id: string;
  bophan: string;
  ngay: string;
  gio: string;
  lydo: string;
  danhsach: string[];
  totruong: string;
  quandoc: string | null;
  lanhdao: string | null;
  createdAt: Date;
}
