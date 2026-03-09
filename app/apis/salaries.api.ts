import apiClient from "~/lib/api-client";

export interface SalariesDto {
  msnv: string;
  cccd: string;
}
export interface SalaryCreateChatDto {
  chat: string;
  salaryId: string;
  isEmployee?: boolean;
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
export const apiSalariesUpload = async (body: any) => {
  const { data } = await apiClient.post(router + "/upload", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
export const apiSalariesCheck = async (body: any) => {
  const { data } = await apiClient.post(router + "/check", body);
  return data;
};
export const apiSalariesDownloadFile = async () => {
  const { data } = await apiClient.get(router + "/file-download");
  return data;
};
export const apiSalariesDetails = async ({
  msnv,
  cccd,
  month,
}: {
  msnv: string;
  cccd: string;
  month: string;
}) => {
  const { data } = await apiClient.get(
    router + `/details?month=${month}&msnv=${msnv}&cccd=${cccd}`,
  );
  return data;
};

export const apiSalariesDashboard = async ({ msnv, cccd }: { msnv: string; cccd: string }) => {
  const { data } = await apiClient.get(router + `/dashboard?msnv=${msnv}&cccd=${cccd}`);
  return data;
};
export const apiSalaryCreateNote = async (formData: SalaryCreateChatDto) => {
  const { data } = await apiClient.post(router + "/chat", formData);
  return data;
};
export const apiSalariesDetailsMonth = async (month: string) => {
  const { data } = await apiClient.get(router + `/get-by-month?month=${month}`);
  return data;
};
export const apiSalariesSendNotification = async () => {
  const { data } = await apiClient.post(router + `/send-notification`);
  return data;
};
export const apiSalariesFindOne = async (id: string) => {
  const { data } = await apiClient.get(router + `/${id}`);
  return data;
};
export const apiSalariesFeedback = async (month: string) => {
  const { data } = await apiClient.get(router + `/check/feedback?month=${month}`);
  return data;
};
