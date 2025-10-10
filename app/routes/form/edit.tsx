import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { apiAuthFindAll } from "~/apis/auth.api";
import { apiFormGetOne, apiFormUpdate } from "~/apis/form.api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import { cn } from "~/lib/utils";
import { linesList, linesListFilter } from "~/lib/variables";
import type { AuthType } from "~/types/auth.type";
import type { FormType } from "~/types/form.type";
import type { Route } from "./+types/edit";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Chỉnh sửa đơn" }, { name: "description", content: "Chỉnh sửa đơn" }];
}
export async function loader({ params: { id } }: Route.LoaderArgs) {
  return id;
}
const formSchema = z.object({
  ngaytao: z.string().optional(),
  hoten: z.string().min(1, "Họ tên không được trống."),
  to: z.string().min(1, "Vui lòng chọn tổ, bộ phận"),
  msnv: z.string().min(1, "MSNV không được trống."),
  songaynghi: z.string().optional(),
  tungay: z.string().optional(),
  denngay: z.string().optional(),
  lydo: z.string().optional(),
  // thaythe: z.string().optional(),
  // chuaxong: z.string().optional(),

  rangay: z.string().optional(),
  tugio: z.string().optional(),
  dengio: z.string().optional(),

  totruong: z.string().optional(),
  quandoc: z.string().optional(),
  lanhdao: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
export default function FormEdit({ loaderData: id }: Route.ComponentProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const formQuery = useQuery<FormType>({
    queryKey: [QUERY_KEY.form.FIND_ONE, id],
    queryFn: () => apiFormGetOne(id),
    enabled: !!id,
    gcTime: 0,
  });
  const usersQuery = useQuery<AuthType[]>({
    queryKey: [QUERY_KEY.auth.GET_USERS],
    queryFn: apiAuthFindAll,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const mutation = useMutation({
    mutationFn: (values: Partial<FormType>) => apiFormUpdate(id, values),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.form.GET_ALL] });
      navigate(routers.form.index);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.ngaytao) {
      mutation.mutate({
        ...values,
        ngaytao: new Date(values.ngaytao),
      });
    }
  }
  if (formQuery.isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="flex flex-col">
      {formQuery.data && (
        <div className="w-full p-4 mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-6 gap-8 p-4 rounded-2xl border shadow-2xl border-blue-500"
            >
              <FormField
                control={form.control}
                name="ngaytao"
                defaultValue={format(new Date(formQuery.data.ngaytao), "yyyy-MM-dd")}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày tạo đơn</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hoten"
                defaultValue={formQuery.data.hoten}
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
                name="to"
                defaultValue={formQuery.data.to}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tổ, bộ phận</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={formQuery.data.to || field.value}
                    >
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

              <FormField
                control={form.control}
                name="msnv"
                defaultValue={formQuery.data.msnv}
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
                name="lydo"
                defaultValue={formQuery.data.lydo || ""}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lý do</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totruong"
                defaultValue={formQuery.data.totruong || ""}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tổ trưởng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quandoc"
                defaultValue={formQuery.data.quandoc || ""}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quản đốc</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lanhdao"
                defaultValue={formQuery.data.lanhdao || ""}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lãnh đạo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* leave */}
              {formQuery.data.loaidon === "leave" ? (
                <>
                  <FormField
                    control={form.control}
                    name="songaynghi"
                    defaultValue={formQuery.data.songaynghi}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số ngày nghỉ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tungay"
                    defaultValue={
                      formQuery.data.tungay && format(formQuery.data.tungay, "yyyy-MM-dd")
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Từ ngày</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="denngay"
                    defaultValue={
                      formQuery.data.denngay && format(formQuery.data.denngay, "yyyy-MM-dd")
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Đến ngày</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="rangay"
                    defaultValue={
                      formQuery.data.rangay && format(formQuery.data.rangay, "yyyy-MM-dd")
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ra cổng ngày</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tugio"
                    defaultValue={formQuery.data.tugio}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Từ giờ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dengio"
                    defaultValue={formQuery.data.dengio}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Đến giờ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex items-center gap-4 w-full">
                <Button asChild className="bg-red-500 hover:bg-red-600">
                  <Link to={routers.form.index}>Quay lại</Link>
                </Button>
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Cập nhật
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 p-4">
        {usersQuery.data && (
          <>
            {usersQuery.data.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex flex-wrap gap-2 border-b",
                  user.bophan === formQuery?.data?.to && "bg-red-100"
                )}
              >
                <span className="text-red-600">
                  {linesList.find((line) => line.value === user.bophan)?.name || "--"}:
                </span>
                <span>{user.name} --</span>
                <span>{user.bophan} --</span>
                <span>{user.username}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
