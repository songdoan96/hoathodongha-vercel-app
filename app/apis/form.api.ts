import apiClient from "~/lib/http";
import type { FormType } from "~/types/form.type";

const router = "/form";
export const apiFormGetOne = async (id: string) => {
  const { data } = await apiClient.get(router + "/" + id);
  return data;
};
export const apiFormGetAll = async (type?: string, value?: string) => {
  if (type && value) {
    const { data } = await apiClient.get(router, {
      params: {
        type,
        value,
        // [type]: value,
      },
    });
    return data;
  } else {
    const { data } = await apiClient.get(router);
    return data;
  }
};
export const apiFormCreate = async (body: Partial<FormType>) => {
  const { data } = await apiClient.post(router, body);
  return data;
};
export const apiFormUpdate = async (id: string, body: Partial<FormType>) => {
  const { data } = await apiClient.patch(router + "/" + id, body);
  return data;
};
export const apiFormDelete = async (id: string) => {
  const { data } = await apiClient.delete(router + "/" + id);
  return data;
};
export async function apiFormSecurityGetGoOut() {
  const { data } = await apiClient.get(router + `/security/get-go-out`);
  return data;
}
export const apiFormSecurityUpdate = async (id: string, body: Partial<FormType>) => {
  const { data } = await apiClient.patch(router + "/security/" + id, body);
  return data;
};
