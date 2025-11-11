import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { apiAuthMe } from "~/apis/auth.api";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";
import Loading from "../Loading";

function PrivateProvider() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await apiAuthMe();
        login(res);
      } catch (error) {
        toast.error("Vui lòng đăng nhập lại");
        navigate(routers().auth.login, {
          state: {
            from: location.pathname,
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
    getProfile();
  }, []);

  if (isLoading) {
    return <Loading fullScreen />;
  }
  return <Outlet />;
}

export default PrivateProvider;
