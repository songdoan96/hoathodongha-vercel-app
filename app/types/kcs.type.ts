import type { PlanType } from "./plan.type";

export interface KcType {
  id: number;
  ngaytao: string;
  laodong: number;
  duphong: number;
  chuyendung: number;
  chitieungay: number;
  sldat: number;
  slloi: number;
  thuchien: number;
  nhaphoanthanh: number;
  btpcap: number;
  chitietloi?: string;
  ghichu?: string;
  plan: PlanType;
}

export interface KcsErrorsType {
  id: number;
  parent_id?: number;
  isAo: boolean;
  maloi: string;
  tenloi: string;
}
