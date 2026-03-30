import apiClient from "~/lib/api-client";
const router = "/meals";

export const apiMealsFindAll = async () => {
  const { data } = await apiClient.get(router);
  return data;
};
export const apiMealsCreate = async (formData: any) => {
  const { data } = await apiClient.post(router, formData);
  return data;
};
