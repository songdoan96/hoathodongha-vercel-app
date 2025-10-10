import apiClient from "~/lib/http";
import type { AuthType } from "~/types/auth.type";

const router = "/auth";

export const apiAuthLogin = async (formData: Pick<AuthType, "username" | "password">) => {
  const { data } = await apiClient.post(router + "/login", formData);
  return data;
};
export const apiAuthFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiAuthCreate = async (formData: Partial<AuthType>) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
export const apiAuthProfile = async () => {
  const { data } = await apiClient.get(router + "/me");
  return data;
};
export const apiAuthFindOne = async (id: string) => {
  const { data } = await apiClient.get(router + "/" + id);
  return data;
};
export const apiAuthUpdate = async (id: string, formData: Partial<AuthType>) => {
  const { data } = await apiClient.patch(router + "/" + id, formData);
  return data;
};
export const apiAuthDelete = async (id: number) => {
  const { data } = await apiClient.delete(router + "/" + id);
  return data;
};
