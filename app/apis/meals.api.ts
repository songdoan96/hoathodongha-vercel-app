import apiClient from "~/lib/api-client";
const router = "/meals";

export const apiMealsFindAll = async (month: string) => {
  const { data } = await apiClient.get(router + `?month=${month}`);
  return data;
};
export const apiMealsCreate = async (formData: any) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
