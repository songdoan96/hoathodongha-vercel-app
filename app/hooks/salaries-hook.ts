import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiSalariesDetails,
  apiSalaryCreateNote,
  type SalaryCreateNoteDto,
} from "~/apis/salaries.api";
import type { SalariesType, SalaryNoteType } from "~/types/salaries-type";
export const FORMS_QUERY_KEY = {
  FIND_ALL: "salaries/FIND_ALL",
  FIND_ONE: "salaries/FIND_ONE",
  SECURITY: "salaries/SECURITY",
  COUNT: "salaries/COUNT",
  DETAIL: "salaries/DETAIL",
};

// export const useSalariesDetail = (month: string) => {
//   return useQuery<SalariesType[]>({
//     queryKey: [FORMS_QUERY_KEY.DETAIL, month],
//     queryFn: () => apiSalariesDetailsMonth(month),
//     enabled: !!month,
//   });
// };
export const useSalariesDetails = ({
  msnv,
  cccd,
  month,
}: {
  msnv: string;
  cccd: string;
  month: string;
}) => {
  return useQuery<{
    salary: SalariesType;
    note: SalaryNoteType[];
  }>({
    queryKey: [FORMS_QUERY_KEY.DETAIL, msnv, cccd, month],
    queryFn: () => apiSalariesDetails({ msnv, cccd, month }),
    enabled: !!msnv && !!cccd && !!month,
  });
};
export const useSalaryCreateNote = () => {
  return useMutation({
    mutationFn: async (formData: SalaryCreateNoteDto) => await apiSalaryCreateNote(formData),
    onSuccess: () => {},
    onError: (error) => {},
  });
};
