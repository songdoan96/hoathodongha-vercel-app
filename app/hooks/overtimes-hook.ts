import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  apiOvertimesCreate,
  apiOvertimesDelete,
  apiOvertimesFindAll,
  apiOvertimesFindOne,
  apiOvertimesSecurityFindAll,
  apiOvertimesUpdate,
  type OvertimesCreateDTO,
  type OvertimesUpdateDTO,
} from "~/apis/overtimes.api";
import routers from "~/lib/routers";
import type { OvertimeType } from "~/types/overtime-type";

const QUERY_KEY = {
  DASHBOARD: "OVERTIMES/DASHBOARD",
  FIND_ONE: "OVERTIMES/FIND_ONE",
  SECURITY: "OVERTIMES/SECURITY",
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
export const useOvertimesFindAll = (month: string) => {
  return useQuery<OvertimeType[]>({
    queryKey: [QUERY_KEY.DASHBOARD, month],
    queryFn: () => apiOvertimesFindAll(month),
    enabled: !!month,
  });
};
export const useOvertimesSecurityFindAll = () => {
  return useQuery<OvertimeType[]>({
    queryKey: [QUERY_KEY.SECURITY],
    queryFn: apiOvertimesSecurityFindAll,
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
    mutationFn: ({ id, formData }: { id: string; formData: any }) =>
      apiOvertimesUpdate(id, formData),
    onSuccess: (res) => {
      toast.success("Thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SECURITY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ONE, res.id] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
export const useOvertimesDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiOvertimesDelete(id),
    onSuccess: () => {
      toast.success("Thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
export const useOvertimesEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: OvertimesUpdateDTO }) =>
      apiOvertimesUpdate(id, formData),
    onSuccess: (res) => {
      toast.success("Thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ONE, res.id] });
      navigate(routers().overtime.dashboard);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
