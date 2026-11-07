import apiClient from "~/lib/api-client";
const router = "/guestflow";

export interface GuestFlowCreateDTO {
  khachhang: string;
  soluongnguoi: number;
  phuongtien: number;
  bienso?: string;
}
export interface GuestFlowOutCreateDTO {
  guestFlowId: string;
  ghichu?: string;
  soluong: number;
}
export const apiGuestFlowCreate = async (formData: GuestFlowCreateDTO) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
export const apiGuestFlowFindAll = async (date: string) => {
  const { data } = await apiClient.get(router + `?date=${date}`);
  return data;
};
export const apiGuestFlowFindOne = async (id: string) => {
  const { data } = await apiClient.get(router + `/${id}`);
  return data;
};
export const apiGuestFlowOutCreate = async (
  formData: GuestFlowOutCreateDTO,
) => {
  const { data } = await apiClient.post(router + "/out", formData);
  return data;
};
