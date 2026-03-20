import apiClient from "~/lib/api-client";
const router = "/overtimes";

export interface OvertimesCreateDTO {
  bophan: string;
  ngay: string;
  gio: string;
  lydo: string;
  danhsach: OvertimeEmployee[];
  totruong: string;
}

export interface OvertimesUpdateDTO {
  bophan?: string;
  ngay?: string;
  gio?: string;
  lydo?: string;
  danhsach?: OvertimeEmployee[];
  totruong?: string;
  quandoc?: string | null;
  lanhdao?: string | null;
  status?: boolean;
}
interface OvertimeEmployee {
  msnv: string;
  hoten: string;
}

export const apiOvertimesFindAll = async (month: string) => {
  const { data } = await apiClient.get(router + `?month=${month}`);
  return data;
};
export const apiOvertimesFindOne = async (id: string) => {
  const { data } = await apiClient.get(router + "/" + id);
  return data;
};
export const apiOvertimesCreate = async (formData: OvertimesCreateDTO) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};

export const apiOvertimesUpdate = async (id: string, formData: OvertimesUpdateDTO) => {
  const { data } = await apiClient.patch(router + "/" + id, formData);
  return data;
};
