export interface GoodsType {
  id: string;
  hoten: string;
  bophan: string;
  tungay?: Date;
  denngay?: Date;
  createdAt: Date;
  totruong: string | null;
  quandoc: string | null;
  lanhdao: string | null;
  baove: string | null;
  baoveTime: Date | null;
  taisan: GoodsOutItemsType[];
  guixe: boolean;
}
export interface GoodsOutItemsType {
  hanghoa: string;
  soluong: number;
  lydo?: string | null;
}
export interface GoodsCreateDto {
  hoten: string;
  bophan: string;
  taisan: GoodsOutItemsType[];
  tungay?: string;
  denngay?: string;
  guixe: boolean;
}
