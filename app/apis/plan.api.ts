import apiClient from "~/lib/http";

const router = "/plan";
export const apiPlanDoing = async () => {
  const { data } = await apiClient.get(router + "/doing");
  return data;
};
