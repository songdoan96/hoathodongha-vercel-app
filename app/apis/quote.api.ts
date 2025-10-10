import apiClient from "~/lib/http";
import type { QuoteType } from "~/types/quote.type";

const router = "/quote";
export const apiQuoteRandomOne = async () => {
  const { data } = await apiClient.get(router + "/random");
  return data;
};
export const apiQuoteGetAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiQuoteCreate = async (body: Partial<QuoteType>) => {
  const { data } = await apiClient.post(router, body);
  return data;
};
// export const apiQuoteUpdate = async (id: string, body: Partial<QuoteType>) => {
//   const { data } = await apiClient.patch(router + "/" + id, body);
//   return data;
// };
// export const apiQuoteDelete = async (id: string) => {
//   const { data } = await apiClient.delete(router + "/" + id);
//   return data;
// };
// export async function apiQuoteSecurityGetGoOut() {
//   const { data } = await apiClient.get(router + `/security/get-go-out`);
//   return data;
// }
// export const apiQuoteSecurityUpdate = async (id: string, body: Partial<QuoteType>) => {
//   const { data } = await apiClient.patch(router + "/security/" + id, body);
//   return data;
// };
