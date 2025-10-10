import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { apiAuthProfile } from "~/apis/auth.api";
import routers from "~/lib/router";
import useAuthStore from "~/stores/auth-store";

function PrivateLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const user = await apiAuthProfile();
        login(user);
      } catch (error) {
        logout();
        navigate(routers.auth.login + "?redirectTo=" + location.pathname);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // if (isLoading) {
  //   return <Loading fullScreen />;
  // }
  if (isLoading) {
    return null;
  }
  return <Outlet />;
}

export default PrivateLayout;
