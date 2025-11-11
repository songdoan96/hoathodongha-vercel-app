import z from "zod";

export const SalariesSchema = z.object({
  msnv: z.string().min(1, "MSNV không được trống."),
  cccd: z.string().min(1, "Số CCCD không được trống."),
  month: z.string().min(1, "Tháng không được trống."),
});
export type SalariesSchemaType = z.infer<typeof SalariesSchema>;
