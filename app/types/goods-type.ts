export interface GoodsType {
  id: string;
  hoten: string;
  bophan: string;
  tungay: string | null;
  createdAt: Date;
  totruong: string | null;
  quandoc: string | null;
  lanhdao: string | null;
  baove: string | null;
  taisan: GoodsOutItemsType[];
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
}
