import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { apiOvertimeCreate } from "~/apis/overtime.api";
import type { AuthStoreType } from "~/stores/auth-store";
import type { EmployeeType } from "~/types/employee";
import type { OvertimeType } from "~/types/overtime";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { QUERY_KEY } from "~/lib/queryKey";

const formSchema = z.object({
  ngay: z.string().min(2, {
    message: "Vui lòng nhập ngày",
  }),
  thoigian: z.string().min(1, {
    message: "Vui lòng nhập thời gian",
  }),
  lydo: z.string().min(1, {
    message: "Vui lòng nhập lý do",
  }),
});
type FormValues = z.infer<typeof formSchema>;

function OvertimeCreateForm({
  employees,
  user,
}: {
  employees: EmployeeType[];
  user: AuthStoreType;
}) {
  const queryClient = useQueryClient();
  const [employeesList, setEmployeesList] = useState(employees);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lydo: "",
      ngay: "",
      thoigian: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: Partial<OvertimeType>) => apiOvertimeCreate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.overtime.FIND_LIST_IN_LINE] });
      // setAccountList(accData);
      form.reset();
      toast.success("Đơn đã được gửi tới lãnh đạo.");
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
    },
  });

  function onSubmit(values: FormValues) {
    if (employeesList.length > 0 && user) {
      mutation.mutate({
        bophan: user.bophan,
        ngay: values.ngay,
        thoigian: values.thoigian,
        lydo: values.lydo,
        totruong: user.name,
        danhsach: JSON.stringify(employeesList.map((item) => item.msnv)),
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full border p-4 shadow-2xl"
      >
        <FormField
          control={form.control}
          name="ngay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thoigian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời gian</FormLabel>
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
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="uppercase text-red-700">
              *** Chọn danh sách nhân viên
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {employees.map((employee, index) => (
                  <div key={employee.msnv} className="flex items-center gap-2 border-b text-base">
                    <Checkbox
                      id={employee.msnv}
                      name={employee.msnv}
                      checked={employeesList.map((e) => e.msnv).includes(employee.msnv)}
                      onCheckedChange={(value) =>
                        value
                          ? setEmployeesList([...employeesList, employee])
                          : setEmployeesList(employeesList.filter((e) => e.msnv !== employee.msnv))
                      }
                    />
                    <span className="min-w-[20px] font-bold text-red-500">{++index}. </span>
                    <label htmlFor={employee.msnv}>
                      {employee.hoten} ({employee.msnv})
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit" disabled={mutation.isPending}>
          Gửi đơn
        </Button>
      </form>
    </Form>
  );
}

export default OvertimeCreateForm;
