import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import Loading from "~/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import {
  useEmployeesCreate,
  useEmployeesDeleteOne,
  useEmployeesFindAll,
  useEmployeesUpdate,
} from "~/hooks/employees-hook";
import { linesList } from "~/lib/variables";
const formSchema = z.object({
  msnv: z.string().min(1, "MSNV không được để trống."),
  hoten: z.string().min(1, "Họ tên không được để trống."),
  bophan: z.string().min(1, "Bộ phân không được để trống."),
  cccd: z.string().optional(),
});
export default function EmployeeDashboardPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bophan: "",
      cccd: "",
      hoten: "",
      msnv: "",
    },
  });
  const { data: employees, isLoading } = useEmployeesFindAll();
  const deleteOneMutation = useEmployeesDeleteOne();
  const updateMutation = useEmployeesUpdate();
  const createMutation = useEmployeesCreate();
  const handleDelete = (id: string) => {
    deleteOneMutation.mutate(id);
  };

  function handleCreate(data: z.infer<typeof formSchema>) {
    createMutation.mutate(data);
  }

  return (
    <div className="flex h-screen w-screen">
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <>
          <div className="flex w-1/3">
            <form
              id="employee-form"
              onSubmit={form.handleSubmit(handleCreate)}
              className="w-full border p-4"
            >
              <FieldGroup>
                <Controller
                  name="hoten"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="hoten">Họ tên</FieldLabel>
                      <Input {...field} id="hoten" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="msnv"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="msnv">MSNV</FieldLabel>
                      <Input {...field} id="msnv" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="bophan"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bophan">Bộ phận</FieldLabel>
                      <Input {...field} id="bophan" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="cccd"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="cccd">CCCD</FieldLabel>
                      <Input {...field} id="cccd" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Field orientation="horizontal" className="mt-8">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Hủy
                </Button>
                <Button type="submit" form="employee-form">
                  Tạo
                </Button>
              </Field>
            </form>
          </div>
          <div className="p-4 flex-1">
            <div className="w-full relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">
                      MSNV
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Họ tên
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Bộ phận
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      CCCD
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee) => (
                    <tr key={employee.id} className="bg-neutral-primary border-b border-default">
                      <td className="px-6 py-4">{employee.msnv}</td>
                      <td className="px-6 py-4">{employee.hoten}</td>
                      <td className="px-6 py-4">
                        {linesList.find((line) => line.value === employee.bophan)?.name}
                      </td>
                      <td className="px-6 py-4">{employee.cccd}</td>
                      <td className="px-6 py-4">
                        <Switch
                          id={`active-${employee.id}`}
                          defaultChecked={employee.active}
                          onClick={() =>
                            updateMutation.mutate({
                              id: employee.id,
                              formData: { active: !employee.active },
                            })
                          }
                        />
                      </td>
                      <td className="px-6 py-4">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                              <Trash />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xóa?</AlertDialogTitle>
                              <AlertDialogDescription>Xóa nhân viên này</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(employee.id)}>
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
