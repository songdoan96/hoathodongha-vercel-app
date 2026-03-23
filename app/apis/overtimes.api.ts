import apiClient from "~/lib/api-client";
const router = "/overtimes";

export interface OvertimesCreateDTO {
  bophan: string;
  ngay: string;
  gio: string;
  lydo: string;
  danhsach: OvertimeEmployee[];
  totruong: string;
  tungay: string;
  denngay: string;
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
// interface OvertimeEmployee {
//   msnv: string;
//   hoten: string;
// }

interface OvertimeEmployee {
  msnv: string;
  hoten: string;
  // status: boolean;
  days?: OvertimeDayEmployee[];
}

interface OvertimeDayEmployee {
  day: string;
  status: boolean;
}
export const apiOvertimesFindAll = async (month: string) => {
  const { data } = await apiClient.get(router + `?month=${month}`);
  return data;
};
export const apiOvertimesSecurityFindAll = async () => {
  const { data } = await apiClient.get(router + `/bao-ve`);
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

export const apiOvertimesUpdate = async (id: string, formData: any) => {
  console.log("🚀 ~ apiOvertimesUpdate ~ formData:", formData);
  const { data } = await apiClient.patch(router + "/" + id, formData);
  return data;
};
export const apiOvertimesDelete = async (id: string) => {
  const { data } = await apiClient.delete(router + "/" + id);
  return data;
};
