import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  apiFormCreate,
  apiFormDelete,
  apiFormFindById,
  apiFormSecurityGetGoOut,
  apiFormsFindAll,
  apiFormSignature,
  apiFormUpdate,
  type SignatureFormDto,
} from "~/apis/forms.api";
import routers from "~/lib/routers";
import type { FormsType } from "~/types/forms-type";

const QUERY_KEY = {
  FIND_ALL: "forms/findAll",
  FIND_ONE: "forms/findOne",
  SECURITY: "forms/security",
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
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
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
  });
};
export const useFormsFindOne = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.FIND_ONE, id],
    queryFn: () => apiFormFindById(id),
    enabled: !!id,
  });
};
