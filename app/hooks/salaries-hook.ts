import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  apiSalariesDetails,
  apiSalariesDetailsMonth,
  apiSalariesFeedback,
  apiSalariesFindOne,
  apiSalaryCreateNote,
  type SalaryCreateNoteDto,
} from "~/apis/salaries.api";
import type { SalariesType } from "~/types/salaries-type";
export const QUERY_KEY = {
  FIND_ALL: "salaries/FIND_ALL",
  FIND_ONE: "salaries/FIND_ONE",
  SECURITY: "salaries/SECURITY",
  COUNT: "salaries/COUNT",
  DETAIL: "salaries/DETAIL",
  FEEDBACK: "salaries/FEEDBACK",
  DETAIL_ALL: "salaries/DETAIL_ALL",
};

export const useSalariesDetails = ({
  msnv,
  cccd,
  month,
}: {
  msnv: string;
  cccd: string;
  month: string;
}) => {
  return useQuery<{ salary: SalariesType; salaries: Pick<SalariesType, "tien_luong_thuc_linh">[] }>(
    {
      queryKey: [QUERY_KEY.DETAIL, msnv, cccd, month],
      queryFn: () => apiSalariesDetails({ msnv, cccd, month }),
      enabled: !!msnv && !!cccd && !!month,
    },
  );
};
export const useSalaryCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: SalaryCreateNoteDto) => await apiSalaryCreateNote(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DETAIL] });
      toast.success("Gửi phản hồi thành công");
    },
    onError: (error) => {},
  });
};
export const useSalariesDetail = (month: string) => {
  return useQuery<SalariesType[]>({
    queryKey: [QUERY_KEY.DETAIL_ALL, month],
    queryFn: () => apiSalariesDetailsMonth(month),
    enabled: !!month,
  });
};
export const useSalariesFindOne = (id: string) => {
  return useQuery<SalariesType>({
    queryKey: [QUERY_KEY.FIND_ONE, id],
    queryFn: () => apiSalariesFindOne(id),
    enabled: !!id,
  });
};
export const useSalariesFeedback = (month: string) => {
  return useQuery<SalariesType[]>({
    queryKey: [QUERY_KEY.FEEDBACK, month],
    queryFn: () => apiSalariesFeedback(month),
    enabled: !!month,
  });
};
