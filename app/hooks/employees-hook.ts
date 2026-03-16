import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  apiEmployeesCreate,
  apiEmployeesDelete,
  apiEmployeesFindAll,
  apiEmployeesFindByStaffId,
  apiEmployeesUpdate,
} from "~/apis/employees.api";
import type { EmployeeType } from "~/types/employee-type";

const QUERY_KEY = {
  FIND_BY_STAFF_ID: "employees/findByStaffId",
  FIND_ALL: "employees/FIND_ALL",
  FIND_ONE: "employees/FIND_ONE",
  CREATE: "employees/CREATE",
  UPDATE: "employees/UPDATE",
  DELETE: "employees/DELETE",
};

export const useEmployeesFindByStaffId = (msnv: string) => {
  return useQuery<EmployeeType>({
    queryKey: [QUERY_KEY.FIND_BY_STAFF_ID, msnv],
    queryFn: () => apiEmployeesFindByStaffId(msnv),
    enabled: !!msnv && msnv.length === 4,
  });
};
export const useEmployeesFindAll = () => {
  return useQuery<EmployeeType[]>({
    queryKey: [QUERY_KEY.FIND_ALL],
    queryFn: apiEmployeesFindAll,
  });
};

export const useEmployeesDeleteOne = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiEmployeesDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
    },
  });
};
export const useEmployeesUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: Partial<EmployeeType> }) =>
      apiEmployeesUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
    },
  });
};
export const useEmployeesCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: Partial<EmployeeType>) => apiEmployeesCreate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
      toast.success("Tạo thành công");
    },
    onError: () => {
      toast.error("Tạo không thành công");
    },
  });
};
