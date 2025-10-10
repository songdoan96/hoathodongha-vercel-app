import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FilePlus } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { apiEmployeeFindAll, apiEmployeeUpdate } from "~/apis/employee.api";
import Loading from "~/components/Loading";
import { Checkbox } from "~/components/ui/checkbox";
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import { checkRole } from "~/lib/utils";
import { linesList } from "~/lib/variables";
import type { EmployeeType } from "~/types/employee";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Danh sách nhân viên" },
    { name: "description", content: "Danh sách nhân viên" },
  ];
}

function EmployeeDashboard() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<EmployeeType[]>({
    queryKey: [QUERY_KEY.employees.FIND_ALL],
    queryFn: apiEmployeeFindAll,
  });
  const mutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: Partial<EmployeeType> }) =>
      apiEmployeeUpdate(id, formData),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.employees.FIND_ALL] });
    },
    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });
  function handleSubmit(employee: EmployeeType) {
    let id = employee.id.toString();
    let formData: Partial<EmployeeType> = {
      active: !employee.active,
    };
    mutation.mutate({ id, formData });
  }
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="flex flex-col p-4">
      <div className="flex mb-4">
        <span className="font-bold w-full text-2xl uppercase flex justify-center items-center text-blue-500">
          Danh sách nhân viên
        </span>
        <Link
          to={routers.employee.add}
          className="btn bg-teal-600 hover:bg-teal-500 min-w-32 text-base uppercase"
        >
          <FilePlus />
          <span>Nhân viên</span>
        </Link>
      </div>
      {data && (
        <table className="text-left">
          <thead>
            <tr>
              <th className="border p-1 px-2 bg-teal-300">STT</th>
              <th className="border p-1 px-2 bg-teal-300">MSNV</th>
              <th className="border p-1 px-2 bg-teal-300">Họ tên</th>
              <th className="border p-1 px-2 bg-teal-300">Bộ phận</th>
              <th className="border p-1 px-2 bg-teal-300">Hoạt động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={employee.id}>
                <td className="border p-1 px-2">
                  {checkRole("admin") ? (
                    <Link
                      to={`/nhan-vien/chinh-sua/${employee.id}`}
                      className="text-blue-500 underline font-bold"
                    >
                      {++index}
                    </Link>
                  ) : (
                    <span>{++index}</span>
                  )}
                </td>
                <td className="border p-1 px-2">{employee.msnv}</td>
                <td className="border p-1 px-2">{employee.hoten}</td>
                <td className="border p-1 px-2">
                  {linesList.find((line) => line.value === employee.bophan)?.name}
                </td>
                <td className="border p-1 px-2">
                  {employee.active ? (
                    <Checkbox checked onClick={() => handleSubmit(employee)} />
                  ) : (
                    <Checkbox onClick={() => handleSubmit(employee)} checked={false} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeeDashboard;
