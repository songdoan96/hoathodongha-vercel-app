import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiOvertimesCreate, type CreateDTO } from "~/apis/overtimes.api";

export const useOvertimesCreate = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: CreateDTO) => apiOvertimesCreate(formData),
    onSuccess: () => {
      toast.success("Xóa thành công");
      //   queryClient.invalidateQueries({ queryKey: [FORMS_QUERY_KEY.FIND_ALL] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
};
