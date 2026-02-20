import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useFormsFindOne, useFormsUpdate } from "~/hooks/forms-hook";
import { linesList, linesListFilter } from "~/lib/variables";
import { FormEditSchema, type FormEditSchemaType } from "~/schemas/forms.schema";
import type { Route } from "./+types/edit";
import { useAuthFindAll } from "~/hooks/auth-hook";
import type { AuthType } from "~/types/auth-type";
import { cn } from "~/lib/utils";
import routers from "~/lib/routers";

export function meta() {
  return [{ title: "Sửa đơn" }, { name: "description", content: "Sửa đơn" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}
function FormEditPage({ loaderData: id }: Route.ComponentProps) {
  const navigate = useNavigate();
  const formFindOne = useFormsFindOne(id);
  const formUpdate = useFormsUpdate();
  const authFindAll = useAuthFindAll();
  const form = useForm<FormEditSchemaType>({
    resolver: zodResolver(FormEditSchema),
  });

  function onSubmit(values: FormEditSchemaType) {
    if (values.ngaytao) {
      formUpdate.mutate({
        id,
        formData: {
          ...values,
          ngaytao: new Date(values.ngaytao),
        },
      });
    }
  }

  if (formFindOne.isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="flex flex-col">
      {formFindOne.data && (
        <div className="w-full p-4 mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-6 gap-8 p-4 rounded-2xl border shadow-2xl border-blue-500"
            >
              <FormField
                control={form.control}
                name="ngaytao"
                defaultValue={format(new Date(formFindOne.data.ngaytao), "yyyy-MM-dd")}
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
                defaultValue={formFindOne.data.hoten}
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
                defaultValue={formFindOne.data.to}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tổ, bộ phận</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={formFindOne.data.to || field.value}
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
                defaultValue={formFindOne.data.msnv}
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
                defaultValue={formFindOne.data.lydo || ""}
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
                defaultValue={formFindOne.data.totruong || ""}
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
                defaultValue={formFindOne.data.quandoc || ""}
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
                defaultValue={formFindOne.data.lanhdao || ""}
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
              {formFindOne.data.loaidon === "leave" ? (
                <>
                  <FormField
                    control={form.control}
                    name="songaynghi"
                    defaultValue={formFindOne.data.songaynghi}
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
                      formFindOne.data.tungay && format(formFindOne.data.tungay, "yyyy-MM-dd")
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
                      formFindOne.data.denngay && format(formFindOne.data.denngay, "yyyy-MM-dd")
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
                      formFindOne.data.rangay && format(formFindOne.data.rangay, "yyyy-MM-dd")
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
                    defaultValue={formFindOne.data.tugio}
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
                    defaultValue={formFindOne.data.dengio}
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

              <div className="flex items-center justify-center gap-4 md:col-span-6">
                <Button
                  asChild
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <span>Quay lại</span>
                </Button>
                <Button
                  //   disabled={mutation.isPending}
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

      <div className="grid grid-cols-1 md:grid-cols-2 p-4 mt-10">
        {authFindAll.data && (
          <>
            {authFindAll.data.map((user: AuthType) => {
              if (linesListFilter.find((line) => line.value === user.bophan)) {
                return (
                  <div
                    key={user.id}
                    className={cn(
                      "flex flex-wrap gap-2 border-b",
                      user.bophan === formFindOne?.data?.to && "bg-red-100",
                    )}
                  >
                    <span className="text-red-600">
                      {linesList.find((line) => line.value === user.bophan)?.name || "--"}:
                    </span>
                    <span>{user.name} --</span>
                    <span>{user.bophan} --</span>
                    <span>{user.username}</span>
                  </div>
                );
              }
            })}
          </>
        )}
      </div>
    </div>
  );
}
export default FormEditPage;
