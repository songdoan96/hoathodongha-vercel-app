interface GuestFlowType {
  id: string;
  khachhang: string;
  phuongtien: number;
  soluongnguoi: number;
  bienso?: string;
  createdAt: Date;
  guestFlowOuts: GuestFlowOutType[];
}
interface GuestFlowOutType {
  id: string;
  guestFlowId: string;
  soluong: number;
  ghichu?: string;
  giora: Date;
}
