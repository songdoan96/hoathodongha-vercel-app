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
