import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiGuestFlowCreate,
  apiGuestFlowFindAll,
  apiGuestFlowFindOne,
  apiGuestFlowOutCreate,
  type GuestFlowCreateDTO,
  type GuestFlowOutCreateDTO,
} from "~/apis/guestflow.api";
export const QUERY_KEY = {
  FIND_ALL: "guestflow/FIND_ALL",
};
export const useGuestFlowCreate = () => {
  return useMutation({
    mutationFn: (formData: GuestFlowCreateDTO) => apiGuestFlowCreate(formData),
  });
};
export const useGuestFlowFindAll = (date: string) => {
  return useQuery<GuestFlowType[]>({
    queryKey: ["guestflow", "findAll", date],
    queryFn: () => apiGuestFlowFindAll(date),
    enabled: !!date,
    refetchInterval: 1000 * 60 * 15,
  });
};
export const useGuestFlowFindOne = (id: string) => {
  return useQuery<GuestFlowType>({
    queryKey: ["guestflow", "findOne", id],
    queryFn: () => apiGuestFlowFindOne(id),
    enabled: !!id,
  });
};
export const useGuestFlowOutCreate = () => {
  return useMutation({
    mutationFn: (formData: GuestFlowOutCreateDTO) =>
      apiGuestFlowOutCreate(formData),
  });
};
