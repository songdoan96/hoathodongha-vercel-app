import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { apiEmployeeFindOne, apiEmployeeUpdate } from "~/apis/employee.api";
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
import type { EmployeeType } from "~/types/employee";
import type { Route } from "./+types/edit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { linesListFilter } from "~/lib/variables";
import routers from "~/lib/router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chỉnh sửa tài khoản" },
    { name: "description", content: "Chỉnh sửa tài khoản" },
  ];
}
const formSchema = z.object({
  msnv: z.string().min(1, "Tài khoản không được trống."),
  hoten: z.string().min(1, "Tên không được trống."),
  bophan: z.string().min(1, "Bộ phận không được trống."),
  active: z.boolean().optional(),
});
type FormValues = z.infer<typeof formSchema>;

export async function clientLoader({ params: { id } }: Route.LoaderArgs) {
  return id;
}
function EmployeeEdit({ loaderData }: Route.ComponentProps) {
  const id = loaderData;
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { data, isLoading } = useQuery<EmployeeType>({
    queryKey: [QUERY_KEY.auth.FIND_ONE, id],
    queryFn: () => apiEmployeeFindOne(id),
    gcTime: 0,
  });
  const mutation = useMutation({
    mutationFn: (formData: Partial<EmployeeType>) => apiEmployeeUpdate(id, formData),
    onSuccess: async () => {
      toast.success("Cập nhật thành công");
      navigate(routers.employee.dashboard);
    },
    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-full max-w-[500px] border mx-auto shadow-2xl rounded-2xl">
        {data && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="msnv"
                defaultValue={data.msnv}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MSNV</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hoten"
                defaultValue={data.hoten}
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
                name="bophan"
                defaultValue={data.bophan}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tổ, bộ phận</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={data.bophan}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tổ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {linesListFilter.map((line) => (
                          <SelectItem key={line.value} value={line.value}>
                            {line.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 justify-end items-center w-full">
                <Button asChild className="bg-red-500 hover:bg-red-600">
                  <Link to={routers.employee.dashboard}>Quay lại</Link>
                </Button>
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {mutation.isPending && <LoaderIcon className="animate-spin" />} Cập nhật
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

export default EmployeeEdit;
