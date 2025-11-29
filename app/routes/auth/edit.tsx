import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Loading from "~/components/Loading";
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
import { useAuthFindOne, useAuthUpdate } from "~/hooks/auth-hook";
import routers from "~/lib/routers";
import { AuthUpdateSchema, type AuthUpdateSchemaType } from "~/schemas/auth.schema";
import type { Route } from "./+types/edit";

export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}

export default function AuthEditPage({ loaderData: id }: Route.ComponentProps) {
  const { data: auth, isLoading } = useAuthFindOne(id);
  const updateMutate = useAuthUpdate();
  const navigate = useNavigate();

  const form = useForm<AuthUpdateSchemaType>({
    resolver: zodResolver(AuthUpdateSchema),
  });

  async function onSubmit(values: AuthUpdateSchemaType) {
    updateMutate.mutate({
      id,
      formData: values,
    });
  }
  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="p-4">
      {auth && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="username"
              defaultValue={auth.username}
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
              name="name"
              defaultValue={auth.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ tên</FormLabel>
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
              defaultValue={auth.password}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bophan"
              defaultValue={auth.bophan}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bộ phận</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 justify-end items-center w-full">
              <Button
                asChild
                className="bg-red-500 hover:bg-red-600 cursor-pointer"
                onClick={() => navigate(routers().auth.dashboard)}
              >
                <span>Quay lại</span>
              </Button>
              <Button
                disabled={updateMutate.isPending}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
              >
                {updateMutate.isPending && <LoaderIcon className="animate-spin" />}
                Cập nhập
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
