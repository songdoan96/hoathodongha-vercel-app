import z from "zod";

export const AuthLoginSchema = z.object({
  username: z.string().min(1, "Tài khoản không được trống."),
  password: z.string().min(1, "Mật khẩu không được trống."),
  fcm_token: z.string().optional(),
});
export type AuthLoginSchemaType = z.infer<typeof AuthLoginSchema>;

export const AuthCreateSchema = z.object({
  username: z.string().min(1, "Tài khoản không được trống."),
  password: z.string().min(1, "Mật khẩu không được trống."),
  name: z.string().min(1, "Mật khẩu không được trống."),
  bophan: z.string().min(1, "Mật khẩu không được trống."),
});
export type AuthCreateSchemaType = z.infer<typeof AuthCreateSchema>;
