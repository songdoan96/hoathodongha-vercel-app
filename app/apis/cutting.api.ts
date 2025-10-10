import apiClient from "~/lib/http";
import type { CuttingTableType } from "~/types/cutting";

const router = "/cutting";
const cuttingTableRouter = router + "/table";
export const apiCuttingTableGetDoingGroupByCustomer = async () => {
  const { data } = await apiClient.get(cuttingTableRouter + "/find-doing-group-customer");
  return data;
};
export const apiCuttingTableCreate = async (formData: Partial<CuttingTableType>) => {
  const { data } = await apiClient.post(cuttingTableRouter, formData);
  return data;
};
export const apiCuttingTableGetByCustomerOrStyle = async ({
  customer,
  style,
}: {
  customer?: string;
  style?: string;
}) => {
  const query = customer ? `?customer=${customer}` : `?style=${style}`;
  const { data } = await apiClient.get(cuttingTableRouter + "/find-by-customer-style" + query);
  return data;
};
