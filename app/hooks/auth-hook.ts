import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  apiAuthCreate,
  apiAuthDelete,
  apiAuthFindAll,
  apiAuthFindOne,
  apiAuthLogin,
  apiAuthMe,
  type AuthCreateDto,
  type AuthLoginDto,
} from "~/apis/auth.api";
import useAuthStore from "~/stores/auth-store";
import type { AuthType } from "~/types/auth-type";

const AUTH_QUERY_KEY = {
  PROFILE: "auth/profile",
  FIND_ALL: "auth/findAll",
  FIND_ONE: "auth/findOne",
};

// const queryClient = useQueryClient();
export const useAuthLogin = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: async (formData: AuthLoginDto): Promise<AuthType & { token: string }> =>
      await apiAuthLogin(formData),
    onSuccess: (response) => {
      localStorage.setItem("token", response.token);
      login(response);
      toast.success("Đăng nhập thành công");
      navigate(location.state?.from || "/", {
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAuthCreate = () => {
  return useMutation({
    mutationFn: async (formData: AuthCreateDto) => await apiAuthCreate(formData),
    onSuccess: () => {
      toast.success("Tạo thành công");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAuthProfile = () => {
  return useQuery({
    queryKey: [AUTH_QUERY_KEY.PROFILE],
    queryFn: apiAuthMe,
  });
};
export const useAuthFindAll = () => {
  return useQuery({
    queryKey: [AUTH_QUERY_KEY.FIND_ALL],
    queryFn: apiAuthFindAll,
  });
};
export const useAuthFindOne = (id: string) => {
  return useQuery({
    queryKey: [AUTH_QUERY_KEY.FIND_ONE],
    queryFn: () => apiAuthFindOne(id),
    enabled: !!id,
  });
};
export const useAuthDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await apiAuthDelete(id),
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY.FIND_ALL] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
