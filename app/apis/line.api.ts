import apiClient from "~/lib/http";

const router = "/line";
export const apiLineGetTVInfo = async (line?: string) => {
  const { data } = await apiClient.get(router + "/tv/" + line);
  return data;
};
