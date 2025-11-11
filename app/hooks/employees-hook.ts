import { useQuery } from "@tanstack/react-query";
import { apiEmployeesFindByStaffId } from "~/apis/employees.api";

const QUERY_KEY = {
  FIND_BY_STAFF_ID: "employees/findByStaffId",
};

// export const useFormsCreate = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   return useMutation({
//     mutationFn: (formData: Partial<FormsType>) => apiFormCreate(formData),
//     onSuccess: () => {
//       toast.success("Tạo thành công");
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
//       navigate(routers().forms.index);
//     },
//     onError: () => {
//       toast.error("Đã xảy ra lỗi, vui lòng thử lại");
//     },
//   });
// };

// export const useFormsFindAll = ({
//   month,
//   type,
//   value,
// }: {
//   month: string;
//   type?: string;
//   value?: string;
// }) =>
//   useInfiniteQuery({
//     queryKey: [QUERY_KEY.FIND_ALL, month, type, value],
//     queryFn: ({ pageParam }) => apiFormsFindAll({ pageParam, month, type, value }),
//     initialPageParam: undefined,
//     getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
//   });

// export const useFormsDelete = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => apiFormDelete(id),
//     onSuccess: () => {
//       toast.success("Xóa thành công");
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
//     },
//     onError: () => {
//       toast.error("Đã xảy ra lỗi, vui lòng thử lại");
//     },
//   });
// };

// export const useFormsUpdate = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, formData }: { id: string; formData: Partial<FormsType> }) =>
//       apiFormUpdate(id, formData),
//     onSuccess: () => {
//       toast.success("Cập nhật thành công");
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
//     },
//     onError: () => {
//       toast.error("Đã xảy ra lỗi, vui lòng thử lại");
//     },
//   });
// };
// export const useFormsSignature = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, formData }: { id: string; formData: SignatureFormDto }) =>
//       apiFormSignature(id, formData),
//     onSuccess: () => {
//       toast.success("Cập nhật thành công");
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FIND_ALL] });
//     },
//     onError: () => {
//       toast.error("Đã xảy ra lỗi, vui lòng thử lại");
//     },
//   });
// };
export const useEmployeesFindByStaffId = (msnv: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.FIND_BY_STAFF_ID, msnv],
    queryFn: () => apiEmployeesFindByStaffId(msnv),
    enabled: !!msnv,
  });
};
