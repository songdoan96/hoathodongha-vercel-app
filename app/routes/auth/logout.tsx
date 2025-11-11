import { useEffect } from "react";
import { useNavigate } from "react-router";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";

function AuthLogoutPage() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate(routers().auth.login);
  }, []);

  return <div>Logout...</div>;
}

export default AuthLogoutPage;
