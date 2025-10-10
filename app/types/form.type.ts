export interface FormType {
  id: number;
  loaidon: "leave" | "out";
  to: string;
  hoten: string;
  msnv: string;
  songaynghi?: string;
  tungay?: string;
  denngay?: string;
  lydo?: string;

  rangay?: string;
  tugio?: string;
  dengio?: string;
  giora?: string;
  giovao?: string;

  totruong?: string;
  quandoc?: string;
  lanhdao?: string;
  ngaytao: Date;

  thaythe?: boolean;
  chuaxong?: boolean;
}
export enum LoaiDon {
  LEAVE = "leave",
  OUT = "out",
}
