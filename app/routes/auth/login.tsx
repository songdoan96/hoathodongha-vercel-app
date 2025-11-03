import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { apiAuthLogin } from "~/apis/auth.api";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import configuration from "~/lib/configuration";
import imagesPath from "~/lib/images";
import routers from "~/lib/router";
import useAuthStore from "~/stores/auth-store";
import type { AuthType } from "~/types/auth.type";
import type { Route } from "./+types/login";
import OneSignal from "react-onesignal";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Đăng nhập" }, { name: "description", content: "Đăng nhập" }];
}
const formSchema = z.object({
  username: z.string().min(1, "Tài khoản không được trống."),
  password: z.string().min(1, "Mật khẩu không được trống."),
});
type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();
  const { login } = useAuthStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: Pick<AuthType, "username" | "password">) => apiAuthLogin(formData),
    onSuccess: async (response) => {
      await OneSignal.User.addTag("forms", response.bophan);
      await OneSignal.login(response.id);
      localStorage.setItem(configuration().TOKEN_KEY, response.token);
      login(response);
      toast.success("Đăng nhập thành công");
      // const redirectPath = location.state?.from?.pathname || "/";
      const redirectTo = searchParams.get("redirectTo") || "/ky-nhan";
      return redirectTo ? navigate(redirectTo) : navigate(-1);
    },
    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu chưa đúng");
      navigate("/dang-nhap");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full p-2">
      <div className="rounded-xl border border-l-4 border-blue-500 shadow-lg w-full md:w-[450px]">
        <div className="flex flex-col gap-2 p-2 items-center text-center">
          <Link to={routers.main.home}>
            <img src={imagesPath.logo} alt="Logo" className="w-14" />
          </Link>
          <p className="font-semibold tracking-tight uppercase text-2xl flex-1">Đăng nhập</p>
        </div>
        <div className="p-4 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tài khoản</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 justify-end items-center w-full">
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {mutation.isPending && <LoaderIcon className="animate-spin" />} Đăng nhập
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
