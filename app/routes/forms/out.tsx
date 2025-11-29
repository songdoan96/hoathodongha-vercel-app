import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDebounce } from "use-debounce";
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
import { useEmployeesFindByStaffId } from "~/hooks/employees-hook";
import { useFormsCreate } from "~/hooks/forms-hook";
import { linesList, linesListFilter } from "~/lib/variables";

import { format } from "date-fns";
import { FormOutCreateSchema, type FormOutCreateSchemaType } from "~/schemas/forms.schema";
import type { EmployeeType } from "~/types/employee-type";
export function meta() {
  return [{ title: "Tạo đơn ra cổng" }, { name: "description", content: "Tạo đơn ra cổng" }];
}
export default function FormCreateOut() {
  const navigate = useNavigate();
  const create = useFormsCreate();

  const [employeeSearch, setEmployeeSearch] = useState("");
  const [debouncedSearch] = useDebounce(employeeSearch, 300);
  const employeeQuery = useEmployeesFindByStaffId(debouncedSearch);

  const form = useForm<FormOutCreateSchemaType>({
    resolver: zodResolver(FormOutCreateSchema),
    defaultValues: {
      to: "",
      rangay: format(new Date(), "yyyy-MM-dd"),
      hoten: "",
      msnv: "",
      tugio: "",
      dengio: "",
      lydo: "",
    },
  });
  function onSubmit(values: FormOutCreateSchemaType) {
    create.mutate({
      formData: {
        ...values,
        loaidon: "out",
      },
    });
  }
  return (
    <>
      <HeaderComponent>
        <HeaderTitle>Tạo đơn ra cổng</HeaderTitle>
      </HeaderComponent>
      <div className="w-full md:w-2/3 p-2 md:p-4 mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:grid-cols-2 gap-4 p-4 rounded-2xl border shadow-2xl border-blue-500"
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
                          if (e.target.value.length > 3) setEmployeeSearch(e.target.value);
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
                            className="inline-flex gap-2 items-center border-b cursor-pointer"
                          >
                            <p className="font-bold">{employee.msnv}:</p>
                            <p className="font-bold">{employee.hoten}</p>
                            <p className="font-bold text-red-500">
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
                  <FormLabel>
                    Tổ, bộ phận: <span className="text-red-500">chọn lại tổ nếu chưa đúng</span>
                  </FormLabel>
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
            <div className="flex gap-4 justify-center items-center w-full col-span-2">
              <Button
                asChild
                className="bg-red-500 hover:bg-red-600 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <span>Quay lại</span>
              </Button>
              {!create.isPending && (
                <Button
                  disabled={create.isPending}
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Tạo đơn
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
