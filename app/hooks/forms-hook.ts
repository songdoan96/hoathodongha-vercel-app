import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  apiFormCreate,
  apiFormDelete,
  apiFormEmployeeDetail,
  apiFormFindById,
  apiFormsCount,
  apiFormSecurityGetGoOut,
  apiFormSecurityUpdateTime,
  apiFormsFindAll,
  apiFormSignature,
  apiFormUpdate,
  type SignatureFormDto,
} from "~/apis/forms.api";
import routers from "~/lib/routers";
import type { FormsCountType, FormsType } from "~/types/forms-type";

const QUERY_KEY = {
  FIND_ALL: "forms/FIND_ALL",
  FIND_ONE: "forms/FIND_ONE",
  SECURITY: "forms/SECURITY",
  COUNT: "forms/COUNT",
  EMPLOYEE_DETAIL: "forms/EMPLOYEE_DETAIL",
};

export const useFormsCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ formData }: { formData: Partial<FormsType> }) => apiFormCreate(formData),
    onSuccess: () => {
      toast.success("Tạo thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
      navigate(routers().forms.index);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};

export const useFormsFindAll = ({
  month,
  type,
  value,
}: {
  month: string;
  type?: string;
  value?: string;
}) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.FIND_ALL, month, type, value],
    queryFn: ({ pageParam }) => apiFormsFindAll({ pageParam, month, type, value }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

export const useFormsCount = (month: string) =>
  useQuery<FormsCountType[]>({
    queryKey: [QUERY_KEY.COUNT, month],
    queryFn: () => apiFormsCount(month),
  });

export const useFormsDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFormDelete(id),
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};

export const useFormsUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: Partial<FormsType> }) =>
      apiFormUpdate(id, formData),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
    },
    onError: (err) => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
      return Promise.reject(err);
    },
  });
};
export const useFormsSignature = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: SignatureFormDto }) =>
      apiFormSignature(id, formData),
    onSuccess: (res) => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ONE, res.id] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
export const useFormsSecurity = () => {
  return useQuery({
    queryKey: [QUERY_KEY.FIND_ALL],
    queryFn: apiFormSecurityGetGoOut,
    refetchInterval: 1000000,
  });
};

export const useFormsSecurityUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: Partial<FormsType> }) =>
      apiFormSecurityUpdateTime(id, formData),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
export const useFormsFindOne = (id: string) => {
  return useQuery<FormsType>({
    queryKey: [QUERY_KEY.FIND_ONE, id],
    queryFn: () => apiFormFindById(id),
    enabled: !!id,
  });
};
export const useFormsEmployeeDetail = (month: string, msnv: string) => {
  return useQuery<FormsType[]>({
    queryKey: [QUERY_KEY.EMPLOYEE_DETAIL, month, msnv],
    queryFn: () => apiFormEmployeeDetail(month, msnv),
    enabled: !!msnv && !!month,
  });
};
