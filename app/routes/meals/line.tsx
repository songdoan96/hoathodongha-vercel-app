import React from "react";
import useAuthStore from "~/stores/auth-store";

function MealsLine() {
  const { user } = useAuthStore();
  console.log("🚀 ~ MealsLine ~ user:", user);
  return <div>MealsLine</div>;
}

export default MealsLine;
