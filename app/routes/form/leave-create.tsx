import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { apiEmployeeSearch } from "~/apis/employee.api";
import { apiFormCreate } from "~/apis/form.api";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
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
import { linesList, linesListFilter } from "~/lib/variables";
import type { EmployeeType } from "~/types/employee";
import type { FormType } from "~/types/form.type";
import type { Route } from "./+types/leave-create";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Tạo đơn nghỉ phép" }, { name: "description", content: "Tạo đơn nghỉ phép" }];
}
const formSchema = z.object({
  hoten: z.string().min(1, "Họ tên không được trống."),
  to: z.string().min(1, "Vui lòng chọn tổ, bộ phận"),
  msnv: z.string().min(1, "MSNV không được trống."),
  songaynghi: z.string().min(1, "Số ngày nghỉ không được trống."),
  tungay: z.string().min(1, "Vui lòng chọn ngày"),
  denngay: z.string().min(1, "Vui lòng chọn ngày"),
  lydo: z.string().optional(),
  // rangay: z.string().optional(),
  // tugio: z.string().optional(),
  // dengio: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

export default function FormCreateLeave() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [employeeSearch, setEmployeeSearch] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hoten: "",
      to: "",
      msnv: "",
      songaynghi: "",
      tungay: "",
      denngay: "",
      lydo: "",
      // rangay: format(new Date(), "yyyy-MM-dd"),
      // tugio: "",
      // dengio: "",
    },
  });

  const employeeQuery = useQuery({
    queryKey: [QUERY_KEY.employees.SEARCH, employeeSearch],
    queryFn: () => apiEmployeeSearch(employeeSearch),
    enabled: !!employeeSearch,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: (values: Partial<FormType>) => apiFormCreate(values),
    onSuccess: () => {
      toast.success("Tạo thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.form.GET_ALL] });
      navigate(routers.form.index);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      ...values,
      loaidon: "leave",
    });
  }
  return (
    <>
      <HeaderComponent>
        <HeaderTitle>Tạo đơn xin nghỉ phép</HeaderTitle>
      </HeaderComponent>
      <div className="w-full p-2 md:w-2/3 md:p-4 mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 rounded-2xl border shadow-2xl border-blue-500"
          >
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="msnv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      MSNV:
                      <span className="text-red-500">chọn tên ở dưới để tự động chọn tổ</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tìm MSNV"
                        {...field}
                        onChange={(e) => {
                          setEmployeeSearch(e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-gray-100 mt-2 text-sm">
                {employeeQuery.data && employeeQuery.data.length > 0 && (
                  <div className="p-2">
                    <h1 className="mb-4 text-red-500 font-bold uppercase">
                      Chọn tên để tự động điền thông tin
                    </h1>
                    <div className="flex flex-col">
                      {employeeQuery.data &&
                        employeeQuery.data.map((employee: EmployeeType) => (
                          <div
                            onClick={() => {
                              form.setValue("msnv", employee.msnv);
                              form.setValue("hoten", employee.hoten);
                              form.setValue("to", employee.bophan, { shouldValidate: true });
                              setEmployeeSearch("");
                            }}
                            key={employee.id}
                            className="inline-flex gap-2 items-center border-b cursor-pointer py-2"
                          >
                            <p className="font-bold text-blue-500">{employee.msnv}:</p>
                            <p className="font-bold">{employee.hoten}</p>
                            <p className="font-bold text-blue-500">
                              ({linesList.find((line) => line.value === employee.bophan)?.name})
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Controller
              name="to"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tổ, bộ phận</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
              name="songaynghi"
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
            <FormField
              control={form.control}
              name="lydo"
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
            {/* <div className="flex items-center gap-4 h-full flex-1">
              <Checkbox checked={addOption} onClick={() => setAddOption(!addOption)} />
              <span>Tạo kèm đơn ra cổng</span>
            </div> */}
            {/* {addOption && (
              <>
                <FormField
                  control={form.control}
                  name="rangay"
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
            )} */}
            <div className="flex gap-4 justify-center items-center w-full col-span-2">
              <Button asChild className="bg-red-500 hover:bg-red-600">
                <Link to={routers.form.index}>Quay lại</Link>
              </Button>
              <Button
                disabled={mutation.isPending}
                type="submit"
                className="bg-teal-500 hover:bg-teal-600"
              >
                Tạo đơn
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
