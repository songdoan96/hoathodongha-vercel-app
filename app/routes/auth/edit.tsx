import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { apiAuthFindOne, apiAuthUpdate } from "~/apis/auth.api";
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
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import { linesList } from "~/lib/variables";
import type { AuthType } from "~/types/auth.type";
import type { Route } from "./+types/edit";

const formSchema = z.object({
  username: z.string().min(1, "Tài khoản không được trống."),
  name: z.string().min(1, "Tên không được trống."),
  password: z.string().min(1, "Mật khẩu không được trống."),
  bophan: z.string().min(1, "Bộ phận không được trống."),
});
type FormValues = z.infer<typeof formSchema>;

export async function loader({ params: { id } }: Route.LoaderArgs) {
  return id;
}
function AuthEdit({ loaderData }: Route.ComponentProps) {
  const id = loaderData;
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { data, isLoading } = useQuery<AuthType>({
    queryKey: [QUERY_KEY.auth.FIND_ONE, id],
    queryFn: () => apiAuthFindOne(String(id)),
  });
  const mutation = useMutation({
    mutationFn: (formData: Partial<AuthType>) => apiAuthUpdate(id, formData),
    onSuccess: async (response) => {
      toast.success("Cập nhật thành công");
      navigate(routers.auth.dashboard);
    },
    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu chưa đúng");
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="">
      {data && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 border p-4">
            <FormField
              control={form.control}
              name="username"
              defaultValue={data.username}
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
              defaultValue={data.name}
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
              defaultValue={data.password}
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
              defaultValue={data.bophan}
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
            <div className="flex">
              {/* {linesList.map((line) => (
                <span key={line.value}>{line.value}</span>
              ))} */}
              {linesList.map((l) => l.value).join(" --- ")}
            </div>
            <div className="flex gap-4 justify-end items-center w-full">
              <Link to={routers.auth.dashboard} className="btn bg-red-500 hover:bg-red-600">
                Quay lại
              </Link>
              <Button
                disabled={mutation.isPending}
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-600"
              >
                {mutation.isPending && <LoaderIcon className="animate-spin" />} Cập nhật
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default AuthEdit;
