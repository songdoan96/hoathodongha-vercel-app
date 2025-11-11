import apiClient from "~/lib/api-client";

export interface SalariesDto {
  msnv: string;
  cccd: string;
}

const router = "/salaries";

export const apiSalariesSearch = async ({
  msnv,
  cccd,
  month,
}: {
  msnv: string;
  cccd: string;
  month: string;
}) => {
  const { data } = await apiClient.get(router, {
    params: {
      msnv,
      cccd,
      month,
    },
  });
  return data;
};
