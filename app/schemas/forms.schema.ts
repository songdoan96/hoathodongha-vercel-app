import z from "zod";

export const FormLeaveCreateSchema = z.object({
  hoten: z.string().min(1, "Họ tên không được trống."),
  to: z.string().min(1, "Vui lòng chọn tổ, bộ phận"),
  msnv: z.string().min(1, "MSNV không được trống."),
  songaynghi: z.string().min(1, "Số ngày nghỉ không được trống."),
  tungay: z.string().min(1, "Vui lòng chọn ngày"),
  denngay: z.string().min(1, "Vui lòng chọn ngày"),
  lydo: z.string().optional(),
});

export const FormOutCreateSchema = z.object({
  to: z.string().min(1, "Vui lòng chọn tổ, bộ phận"),
  rangay: z.string().min(1, "Vui lòng chọn ngày"),
  hoten: z.string().min(1, "Họ tên không được trống."),
  msnv: z.string().min(1, "MSNV không được trống."),
  tugio: z.string().min(1, "Vui lòng nhập giờ ra"),
  dengio: z.string().min(1, "Vui lòng nhập giờ vào"),
  lydo: z.string().optional(),
});

export const FormEditSchema = z.object({
  ngaytao: z.string().optional(),
  hoten: z.string().min(1, "Họ tên không được trống."),
  to: z.string().min(1, "Vui lòng chọn tổ, bộ phận"),
  msnv: z.string().min(1, "MSNV không được trống."),
  songaynghi: z.string().optional(),
  tungay: z.string().optional(),
  denngay: z.string().optional(),
  lydo: z.string().optional(),

  rangay: z.string().optional(),
  tugio: z.string().optional(),
  dengio: z.string().optional(),

  totruong: z.string().optional(),
  quandoc: z.string().optional(),
  lanhdao: z.string().optional(),
});

export type FormLeaveCreateSchemaType = z.infer<typeof FormLeaveCreateSchema>;
export type FormOutCreateSchemaType = z.infer<typeof FormOutCreateSchema>;
export type FormEditSchemaType = z.infer<typeof FormEditSchema>;
