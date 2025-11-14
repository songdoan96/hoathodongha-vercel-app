import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthProfile } from "~/hooks/auth-hook";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";
import Loading from "../Loading";

function PrivateProvider() {
  const { isLoading, data, isError, isPending } = useAuthProfile();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { logout } = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    if (isError && !isLoading) {
      toast.error("Vui lòng đăng nhập lại");
      logout();
      navigate(routers().auth.login, {
        state: {
          from: location.pathname,
        },
      });
    }
    if (!isError && !isLoading) {
      login(data);
    }
  }, [isLoading, data, isError]);

  // useEffect(() => {
  //   async function getProfile() {
  //     try {
  //       const res = await apiAuthMe();
  //       login(res);
  //     } catch (error) {
  //       toast.error("Vui lòng đăng nhập lại");
  //       navigate(routers().auth.login, {
  //         state: {
  //           from: location.pathname,
  //         },
  //       });
  //       return error;
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getProfile();
  // }, []);

  if (isLoading || isPending) {
    return <Loading fullScreen />;
  }
  return <Outlet />;
}

export default PrivateProvider;
