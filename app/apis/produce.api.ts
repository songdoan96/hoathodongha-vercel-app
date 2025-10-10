import apiClient from "~/lib/http";

const router = "/produce";
export const apiProduceDashboard = async () => {
  const { data } = await apiClient.get(router + "/dashboard");
  return data;
};
