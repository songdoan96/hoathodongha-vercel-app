import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
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
import { useAuthLogin } from "~/hooks/auth-hook";
import imagesPath from "~/lib/images-path";
import routers from "~/lib/routers";
import { AuthLoginSchema, type AuthLoginSchemaType } from "~/schemas/auth.schema";
export function meta() {
  return [{ title: "Đăng nhập" }];
}
function LoginPage() {
  const { isPending, mutate } = useAuthLogin();
  const form = useForm<AuthLoginSchemaType>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: AuthLoginSchemaType) {
    // loginMutation.mutate(values);
    mutate(values);
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full p-2">
      <div className="rounded-xl border border-l-4 border-blue-500 shadow-lg w-full md:w-[450px]">
        <div className="flex flex-col gap-2 p-2 items-center text-center">
          <Link to={routers().main.home}>
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
                  disabled={isPending}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isPending && <LoaderIcon className="animate-spin" />}
                  Đăng nhập
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
