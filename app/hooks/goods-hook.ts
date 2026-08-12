import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiGoodsCreate,
  apiGoodsFindAll,
  apiGoodsFindOne,
  apiGoodsSecurityFindAll,
  apiGoodsSecuritySignature,
  apiGoodsSignature,
} from "~/apis/goods.api";
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
export const useGoodsSecurityFindAll = () =>
  useQuery<GoodsType[]>({
    queryKey: ["goods", "security"],
    queryFn: () => apiGoodsSecurityFindAll(),
  });
export const useGoodsFinOne = (id: string) =>
  useQuery<GoodsType>({
    queryKey: ["goods", "one", id],
    queryFn: () => apiGoodsFindOne(id),
    enabled: !!id,
  });
export const useGoodsSignature = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: { ten: string; chucvu: string } }) =>
      apiGoodsSignature(id, formData),
  });
};
export const useGoodsSecuritySignature = () => {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: { ten: string } }) =>
      apiGoodsSecuritySignature(id, formData),
  });
};
