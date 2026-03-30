import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiMealsCreate, apiMealsFindAll } from "~/apis/meals.api";
import { apiOvertimesCreate } from "~/apis/overtimes.api";
import type { MealsType } from "~/types/meals-type";

const QUERY_KEY = {
  DASHBOARD: "MEALS/DASHBOARD",
  FIND_ONE: "MEALS/FIND_ONE",
  SECURITY: "MEALS/SECURITY",
};
export const useMealsFindAll = () => {
  return useQuery<MealsType[]>({
    queryKey: [QUERY_KEY.DASHBOARD],
    queryFn: () => apiMealsFindAll(),
  });
};

export const useMealsCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ formData }: { formData: any }) => apiMealsCreate(formData),
    onSuccess: () => {
      // toast.success("Tạo thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
      // navigate(routers().forms.index);
    },
    onError: () => {
      // toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
