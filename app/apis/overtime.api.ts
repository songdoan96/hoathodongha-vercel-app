import apiClient from "~/lib/http";
import type { EmployeeType } from "~/types/employee";

const router = "/overtime";

export const apiOvertimeFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiOvertimeFindOne = async (id?: string) => {
  const { data } = await apiClient.get(`${router}/${id}`);
  return data;
};
// export const apiOvertimeCreate = async (formData: Partial<EmployeeType>) => {
//   const { data } = await apiClient.post(router, formData);
//   return data;
// };
// export const apiOvertimeUpdate = async (id?: string, formData?: Partial<EmployeeType>) => {
//   const { data } = await apiClient.patch(`${router}/${id}`, formData);
//   return data;
// };
// export const apiOvertimeDelete = async (id: string) => {
//   const { data } = await apiClient.delete(`${router}/${id}`);
//   return data;
// };
export async function apiOvertimeFindListInLine(bophan?: string) {
  if (bophan) {
    const { data } = await apiClient.get(router + "/find-list-in-line/" + bophan);
    return data;
  }
}
export async function apiOvertimeCreate(formData: Partial<EmployeeType>) {
  const { data } = await apiClient.post(router, formData);
  return data;
}
export async function apiOvertimeLineDelete(id: string) {
  const { data } = await apiClient.delete(`${router}/${id}`);
  return data;
}
