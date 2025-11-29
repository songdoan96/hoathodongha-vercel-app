import apiClient from "~/lib/api-client";
import type { AuthType } from "~/types/auth-type";
export interface AuthLoginDto {
  username: string;
  password: string;
  fcm_token?: string;
}
export interface AuthCreateDto {
  username: string;
  password: string;
  name: string;
  bophan: string;
}
export interface AuthUpdateDto {
  username: string;
  password: string;
  name: string;
  bophan: string;
}

const router = "/auth";

export const apiAuthLogin = async (authLoginDto: AuthLoginDto) => {
  const { data } = await apiClient.post(router + "/login", authLoginDto);
  return data;
};
export const apiAuthMe = async () => {
  const { data } = await apiClient.get(router + "/me");
  return data;
};
export const apiAuthFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiAuthFindOne = async (id: string) => {
  const { data } = await apiClient.get(router + `/${id}`);
  return data;
};

export const apiAuthCreate = async (formData: Partial<AuthType>) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
export const apiAuthDelete = async (id: string) => {
  const { data } = await apiClient.delete(router + "/" + id);
  return data;
};
export const apiAuthUpdate = async (id: string, formData: AuthUpdateDto) => {
  const { data } = await apiClient.patch(router + "/" + id, formData);
  return data;
};
