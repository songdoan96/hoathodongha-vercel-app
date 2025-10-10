import apiClient from "~/lib/http";

const router = "/welcome";
// export const apiQuoteRandomOne = async () => {
//   const { data } = await apiClient.get(router + "/random");
//   return data;
// };
export const apiWelcomeGetAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
