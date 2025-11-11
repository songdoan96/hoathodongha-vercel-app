import useAuthStore from "~/stores/auth-store";

export function checkRole(role = "admin") {
  if (!useAuthStore.getState().user) {
    return false;
  }
  const bophan = useAuthStore.getState().user?.bophan;
  if (!bophan) {
    return false;
  }
  if (bophan === role || bophan === "admin") {
    return true;
  }
  return false;
}
