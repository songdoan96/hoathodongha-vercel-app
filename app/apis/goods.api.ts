import apiClient from "~/lib/api-client";
import type { GoodsCreateDto } from "~/types/goods-type";

const router = "/goods";

export const apiGoodsCreate = async (body: GoodsCreateDto) => {
  const { data } = await apiClient.post(router, body);
  return data;
};
export const apiGoodsFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiGoodsFindOne = async (id: string) => {
  const { data } = await apiClient.get(router + "/" + id);
  return data;
};

export const apiGoodsSignature = async (id: string, body: { ten: string; chucvu: string }) => {
  const { data } = await apiClient.patch(router + "/signature/" + id, body);
  return data;
};
export const apiGoodsSecuritySignature = async (id: string, formData: { ten: string }) => {
  const { data } = await apiClient.patch(router + "/security-signature/" + id, formData);
  return data;
};
