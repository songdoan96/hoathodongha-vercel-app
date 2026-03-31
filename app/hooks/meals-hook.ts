import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { apiMealsCreate, apiMealsFindAll } from "~/apis/meals.api";
import type { MealsType } from "~/types/meals-type";

const QUERY_KEY = {
  DASHBOARD: "MEALS/DASHBOARD",
  FIND_ONE: "MEALS/FIND_ONE",
  SECURITY: "MEALS/SECURITY",
};
export const useMealsFindAll = (month: string) => {
  return useQuery<MealsType[]>({
    queryKey: [QUERY_KEY.DASHBOARD, month],
    queryFn: () => apiMealsFindAll(month),
    enabled: !!month,
  });
};

export const useMealsCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
