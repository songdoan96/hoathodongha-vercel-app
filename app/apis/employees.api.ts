import apiClient from "~/lib/api-client";
import type { EmployeeType } from "~/types/employee-type";
const router = "/employees";
export const apiEmployeesFindByStaffId = async (msnv: string) => {
  const { data } = await apiClient.get(router + "/find-staff-id", { params: { msnv } });
  return data;
};
export const apiEmployeesFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiEmployeesFindWithLine = async (line: string) => {
  const { data } = await apiClient.get(router + "/find-with-line?line=" + line);
  return data;
};
export const apiEmployeesFindById = async (id: string) => {
  const { data } = await apiClient.get(router + `/${id}`);
  return data;
};
export const apiEmployeesCreate = async (body: Partial<EmployeeType>) => {
  const { data } = await apiClient.post(router, body);
  return data;
};
export const apiEmployeesUpdate = async (id: string, body: any) => {
  const { data } = await apiClient.patch(router + `/${id}`, body);
  return data;
};
export const apiEmployeesDelete = async (id: string) => {
  const { data } = await apiClient.delete(router + `/${id}`);
  return data;
};
