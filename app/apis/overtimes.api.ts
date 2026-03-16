import apiClient from "~/lib/api-client";
const router = "/overtimes";

export interface CreateDTO {
  bophan: string;
  ngay: string;
  gio: string;
  lydo: string;
  danhsach: string[];
  totruong: string;
}

export const apiOvertimesFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiOvertimesCreate = async (formData: CreateDTO) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
