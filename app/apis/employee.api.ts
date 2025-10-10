import apiClient from "~/lib/http";
import type { EmployeeType } from "~/types/employee";

const router = "/employee";

export const apiEmployeeFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiEmployeeFindOne = async (id?: string) => {
  const { data } = await apiClient.get(`${router}/${id}`);
  return data;
};
export const apiEmployeeCreate = async (formData: Partial<EmployeeType>) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
export const apiEmployeeUpdate = async (id?: string, formData?: Partial<EmployeeType>) => {
  const { data } = await apiClient.patch(`${router}/${id}`, formData);
  return data;
};
export const apiEmployeeDelete = async (id: string) => {
  const { data } = await apiClient.delete(`${router}/${id}`);
  return data;
};

export const apiEmployeeSearch = async (query: string) => {
  const { data } = await apiClient.get(router + "/find/search-many", { params: { query } });
  return data;
};
