import apiClient from "~/lib/api-client";
import type { FormsType } from "~/types/forms-type";

const router = "/forms";
export interface SignatureFormDto {
  chucvu: string;
  hoten: string;
  thaythe?: boolean;
}
export const apiFormCreate = async (body: Partial<FormsType>) => {
  const { data } = await apiClient.post(router, body);
  return data;
};

export async function apiFormFindById(id: string) {
  const { data } = await apiClient.get(router + `/${id}`);
  return data;
}

export const apiFormsFindAll = async ({
  pageParam,
  month,
  type,
  value,
}: {
  pageParam?: string;
  month?: string;
  type?: string;
  value?: string;
}) => {
  const { data } = await apiClient.get(router, {
    params: { month, cursor: pageParam, type, value },
  });
  return data;
};
export const apiFormsCount = async (month: string) => {
  const { data } = await apiClient.get(router + "/count-form", {
    params: { month },
  });
  return data;
};
export const apiFormDelete = async (id: string) => {
  const { data } = await apiClient.delete(router + "/" + id);
  return data;
};
export const apiFormUpdate = async (id: string, body: Partial<FormsType>) => {
  const { data } = await apiClient.patch(router + "/" + id, body);
  return data;
};
export const apiFormSignature = async (id: string, body: SignatureFormDto) => {
  const { data } = await apiClient.patch(router + "/signature/" + id, body);
  return data;
};
export async function apiFormSecurityGetGoOut() {
  const { data } = await apiClient.get(router + `/security/get-go-out`);
  return data;
}
export async function apiFormEmployeeDetail(month: string, msnv: string) {
  const { data } = await apiClient.get(router + `/employee-detail?month=${month}&msnv=${msnv}`);
  return data;
}
export async function apiFormSecurityUpdateTime(id: string, body: Partial<FormsType>) {
  const { data } = await apiClient.patch(router + "/security-update-time/" + id, body);
  return data;
}
