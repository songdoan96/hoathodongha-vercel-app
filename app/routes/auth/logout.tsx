import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "~/stores/auth-store";

function LogoutPage() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/dang-nhap");
  }, []);
  return null;
}

export default LogoutPage;
