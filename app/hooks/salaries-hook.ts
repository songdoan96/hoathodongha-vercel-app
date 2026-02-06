import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiSalariesDetails,
  apiSalariesDetailsMonth,
  apiSalaryCreateNote,
  type SalaryCreateNoteDto,
} from "~/apis/salaries.api";
import type { SalariesType } from "~/types/salaries-type";
export const FORMS_QUERY_KEY = {
  FIND_ALL: "salaries/FIND_ALL",
  FIND_ONE: "salaries/FIND_ONE",
  SECURITY: "salaries/SECURITY",
  COUNT: "salaries/COUNT",
  DETAIL: "salaries/DETAIL",
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
      queryKey: [FORMS_QUERY_KEY.DETAIL, msnv, cccd, month],
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
      queryClient.invalidateQueries({ queryKey: [FORMS_QUERY_KEY.DETAIL] });
    },
    onError: (error) => {},
  });
};
export const useSalariesDetail = (month: string) => {
  return useQuery<SalariesType[]>({
    queryKey: [FORMS_QUERY_KEY.DETAIL_ALL, month],
    queryFn: () => apiSalariesDetailsMonth(month),
    enabled: !!month,
  });
};
