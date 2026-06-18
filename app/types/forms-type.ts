export interface FormsType {
  id: string;
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
  giora?: string | null | undefined;
  giovao?: string | null | undefined;

  totruong?: string;
  quandoc?: string;
  lanhdao?: string;
  ngaytao: Date;

  totruongTime?: Date;
  quandocTime?: Date;
  lanhdaoTime?: Date;

  thaythe?: boolean;
  chuaxong?: boolean;

  giamdocky: boolean;
}
export interface FormsCountType {
  count: number;
  loaidon: LoaiDon;
  msnv: string;
}
export enum LoaiDon {
  LEAVE = "leave",
  OUT = "out",
}
