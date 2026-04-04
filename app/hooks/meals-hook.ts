import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  apiMealsCreate,
  apiMealsCreateNextDay,
  apiMealsFindAll,
  apiMealsFindNextDay,
  apiMealsFindPrintNextDay,
} from "~/apis/meals.api";
import type { MealsType, MealsLineType } from "~/types/meals-type";

const QUERY_KEY = {
  DASHBOARD: "MEALS/DASHBOARD",
  // FIND_ONE: "MEALS/FIND_ONE",
  NEXT_DAY: "MEALS/NEXT_DAY",
};
export const useMealsFindAll = (month: string) => {
  return useQuery<MealsType[]>({
    queryKey: [QUERY_KEY.DASHBOARD, month],
    queryFn: () => apiMealsFindAll(month),
    enabled: !!month,
  });
};
export const useMealsNextDay = (bophan: string) => {
  return useQuery<MealsType[]>({
    queryKey: [QUERY_KEY.NEXT_DAY, bophan],
    queryFn: () => apiMealsFindNextDay(bophan),
    enabled: !!bophan,
  });
};
export const useMealsPrintNextDay = (day: string) => {
  return useQuery<MealsType>({
    queryKey: [QUERY_KEY.NEXT_DAY, day],
    queryFn: () => apiMealsFindPrintNextDay(day),
    enabled: !!day,
  });
};

export const useMealsCreate = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ formData }: { formData: any }) => apiMealsCreate(formData),
    onSuccess: () => {
      toast.success("Thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
      // navigate(routers().forms.index);
    },
    onError: () => {
      // toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
export const useMealsNextDayCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ formData }: { formData: any }) => apiMealsCreateNextDay(formData),
    onSuccess: () => {
      toast.success("Thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.NEXT_DAY] });
      // navigate(routers().forms.index);
    },
    onError: () => {
      // toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
