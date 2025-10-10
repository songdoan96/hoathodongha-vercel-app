import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { apiEmployeeCreate } from "~/apis/employee.api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import routers from "~/lib/router";
import { linesList } from "~/lib/variables";
import type { EmployeeType } from "~/types/employee";
import type { Route } from "./+types/add";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Thêm tài khoản" }, { name: "description", content: "Thêm tài khoản" }];
}

const formSchema = z.object({
  msnv: z.string().min(1, "Tài khoản không được trống."),
  hoten: z.string().min(1, "Họ tên không được trống."),
  bophan: z.string().min(1, "Bộ phận không được trống."),
});
type FormValues = z.infer<typeof formSchema>;
function AuthAdd() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      msnv: "",
      hoten: "",
      bophan: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: Partial<EmployeeType>) => apiEmployeeCreate(formData),
    onSuccess: async () => {
      toast.success("Tạo thành công");
      navigate(routers.employee.dashboard);
    },
    onError: () => {
      toast.error("Tạo không thành công");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-full max-w-[500px] border mx-auto shadow-2xl rounded-2xl">
        <h1 className="text-center my-2 font-bold text-xl uppercase">Thêm nhân viên</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="msnv"
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tổ, bộ phận</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tổ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {linesList.map((line) => (
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
                {mutation.isPending ? <LoaderIcon className="animate-spin" /> : <Plus />} Thêm
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AuthAdd;
