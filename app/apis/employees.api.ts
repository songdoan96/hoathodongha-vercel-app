import apiClient from "~/lib/api-client";
const router = "/employees";
export const apiEmployeesFindByStaffId = async (msnv: string) => {
  const { data } = await apiClient.get(router + "/find-staff-id", { params: { msnv } });
  return data;
};
