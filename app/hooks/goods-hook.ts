import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGoodsCreate, apiGoodsFindAll } from "~/apis/goods.api";
import type { GoodsCreateDto, GoodsType } from "~/types/goods-type";

export const useGoodsCreate = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: GoodsCreateDto }) => apiGoodsCreate(formData),
  });
};

export const useGoodsFindAll = () =>
  useQuery<GoodsType[]>({
    queryKey: ["goods"],
    queryFn: () => apiGoodsFindAll(),
  });
