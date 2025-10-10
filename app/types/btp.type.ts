export interface BTPType {
  id: number;
  plan_id: number;
  size: string;
  color: string;
  slkh: number;
  BTPDay?: BTPDays[];
}
export interface BTPDays {
  id: number;
  btp_id: number;
  slcat: number;
  slcap: number;
  ngay: string;
}
