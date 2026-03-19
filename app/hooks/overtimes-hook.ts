import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  apiOvertimesCreate,
  apiOvertimesFindAll,
  apiOvertimesFindOne,
  apiOvertimesUpdate,
  type OvertimesCreateDTO,
  type OvertimesUpdateDTO,
} from "~/apis/overtimes.api";
import routers from "~/lib/routers";
import type { OvertimeType } from "~/types/overtime-type";

const QUERY_KEY = {
  DASHBOARD: "OVERTIMES/DASHBOARD",
  FIND_ONE: "OVERTIMES/FIND_ONE",
};
export const useOvertimesCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: OvertimesCreateDTO) => apiOvertimesCreate(formData),
    onSuccess: () => {
      toast.success("Tạo đơn thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
      navigate(routers().overtime.dashboard);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
export const useOvertimesFindAll = () => {
  return useQuery<OvertimeType[]>({
    queryKey: [QUERY_KEY.DASHBOARD],
    queryFn: apiOvertimesFindAll,
  });
};
export const useOvertimesFindOne = (id: string) => {
  return useQuery<OvertimeType>({
    queryKey: [QUERY_KEY.FIND_ONE, id],
    queryFn: () => apiOvertimesFindOne(id),
    enabled: !!id,
  });
};
export const useOvertimesUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: OvertimesUpdateDTO }) =>
      apiOvertimesUpdate(id, formData),
    onSuccess: (res) => {
      toast.success("Thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ONE, res.id] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
