import type { BTPType } from "./btp.type";
import type { KcType } from "./kcs.type";

export interface PlanType {
  id: number;
  chuyen: string;
  khachhang: string;
  mahang: string;
  ngaydukien: string;
  ngayrai?: string;
  sltacnghiep: number;
  daraichuyen: boolean;
  thuchien: number;
  nhaphoanthanh: number;
  btpcap: number;
  mucvon: number;
  ghichu?: string;
  daxong: boolean;
  ngayxong: Date;
  created_at: string;
  dot: string;
  isAo: boolean;
  kcs?: KcType[];

  btps?: BTPType[];
}
