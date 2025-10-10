import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiAuthDelete } from "~/apis/auth.api";
import { QUERY_KEY } from "~/lib/queryKey";
export const useAuth = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => apiAuthDelete(id),
    onSuccess: (res) => {
      // setUser(res);
      // localStorage.setItem(configuration().TOKEN_KEY, res.token);
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.auth.GET_USERS] });
      // router.push("/");
    },
    onError: (error) => {
      toast.error("Xóa không thành công");
    },
  });

  return { deleteMutation };
};
