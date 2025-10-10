import apiClient from "~/lib/http";
import type { KcType } from "~/types/kcs.type";

const router = "/kcs";

export const apiKCSUpdate = async (id?: number, formData?: Partial<KcType>) => {
  if (id) {
    const { data } = await apiClient.patch(router + "/" + id, formData);
    return data;
  }
};
export const apiKCSAddTargetDate = async (formData: Partial<KcType> & { plan_id?: number }) => {
  const { data } = await apiClient.post(router + "/add-target-date", formData);
  return data;
};
export const apiKCSDashboard = async (date?: string) => {
  if (date) {
    const { data } = await apiClient.get(router + "/dashboard?date=" + date);
    return data;
  }
};
export const apiKCSReport = async (id?: string) => {
  if (id) {
    const { data } = await apiClient.get(router + "/report/" + id);
    return data;
  }
};
export const apiKCSUpdatePassed = async (id?: string) => {
  if (id) {
    const { data } = await apiClient.post(router + "/passed/" + id);
    return data;
  }
};
export const apiKCSUpdateFailed = async (id?: string, maloi?: string) => {
  if (id && maloi) {
    const { data } = await apiClient.post(router + "/failed/" + id, { maloi });
    return data;
  }
};
