import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  apiSalariesDashboard,
  apiSalariesDetails,
  apiSalariesDetailsMonth,
  apiSalariesFeedback,
  apiSalariesFindOne,
  apiSalaryCreateNote,
  type SalaryCreateChatDto,
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
  return useQuery<SalariesType>({
    queryKey: [QUERY_KEY.DETAIL, msnv, cccd, month],
    queryFn: () => apiSalariesDetails({ msnv, cccd, month }),
    enabled: !!msnv && !!cccd && !!month,
  });
};

export const useSalariesDashboard = ({ msnv, cccd }: { msnv: string; cccd: string }) => {
  return useQuery<SalariesType[]>({
    queryKey: [QUERY_KEY.DETAIL, msnv, cccd],
    queryFn: () => apiSalariesDashboard({ msnv, cccd }),
    enabled: !!msnv && !!cccd,
  });
};
export const useSalaryCreateChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: SalaryCreateChatDto) => await apiSalaryCreateNote(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DETAIL] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FEEDBACK] });
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
