import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useEffect, useState, type FormEvent } from "react";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useEmployeesFindAll, useEmployeesFindByStaffId } from "~/hooks/employees-hook";
import { useOvertimesCreate } from "~/hooks/overtimes-hook";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { EmployeeType } from "~/types/employee-type";

export function meta() {
  return [{ title: "ĐĂNG KÝ TĂNG CA" }];
}

const columnHelper = createColumnHelper<EmployeeType>();
const columns = [
  columnHelper.accessor("id", {
    id: "id",
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,

    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mx-auto border-black"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn hàng"
        title={row.original.id.toString()}
      />
    ),
  }),
  columnHelper.display({
    id: "index",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  }),
  columnHelper.accessor("msnv", {
    header: "MSNV",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hoten", {
    header: "Họ tên",
    cell: (info) => info.getValue(),
  }),

  // columnHelper.accessor("bophan", {
  //   header: "Bộ phận",
  //   cell: (info) => linesList.find((line) => line.value === info.getValue())?.name,
  // }),
];

function OvertimeCreate() {
  const { user } = useAuthStore();
  const { data: employeesData, isLoading: employeesIsLoading } = useEmployeesFindAll();
  const [currentEmployees, setCurrentEmployees] = useState<EmployeeType[]>();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const mutate = useOvertimesCreate();

  const [employeeSearch, setEmployeeSearch] = useState("");
  const { data: employeesFindByStaffId } = useEmployeesFindByStaffId(employeeSearch);
  const [bophan, setBophan] = useState(user?.bophan);
  const [ngayDangKy, setNgayDangKy] = useState("");
  const [gioDangKy, setGioDangKy] = useState("");
  const [lydo, setLydo] = useState("");

  useEffect(() => {
    if (employeesData && user?.bophan) {
      const employees = employeesData.filter((employee) => employee.bophan === user.bophan);
      setCurrentEmployees(employees);
    }
  }, [employeesData]);

  const table = useReactTable({
    data: currentEmployees || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id,
    enableRowSelection: true,
  });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user?.bophan && table.getSelectedRowModel().rows.length > 0) {
      mutate.mutate({
        bophan: user?.bophan,
        ngay: ngayDangKy,
        gio: gioDangKy,
        lydo,
        totruong: user.name,
        danhsach: table.getSelectedRowModel().rows.map((id) => ({
          msnv: id.original.msnv,
          hoten: id.original.hoten,
        })),
      });
    }
  }
  return (
    <div>
      <HeaderComponent>
        <HeaderTitle>ĐĂNG KÝ TĂNG CA</HeaderTitle>
      </HeaderComponent>
      <form onSubmit={handleSubmit}>
        <div className="p-2 flex flex-col gap-2">
          <div className="flex">
            <Label htmlFor="bophan" className="w-3/7">
              Bộ phận
            </Label>
            <Input
              name="bophan"
              id="bophan"
              value={bophan}
              onChange={(e) => setBophan(e.target.value)}
              required
            />
          </div>
          <div className="flex">
            <Label htmlFor="ngay" className="w-3/7">
              Ngày đăng ký
            </Label>
            <Input
              name="ngay"
              id="ngay"
              value={ngayDangKy}
              onChange={(e) => setNgayDangKy(e.target.value)}
              required
            />
          </div>
          <div className="flex">
            <Label htmlFor="gio" className="w-3/7">
              Giờ đăng ký
            </Label>
            <Input
              name="gio"
              id="gio"
              value={gioDangKy}
              onChange={(e) => setGioDangKy(e.target.value)}
              required
            />
          </div>
          <div className="flex">
            <Label htmlFor="lydo" className="w-3/7">
              Lý do
            </Label>
            <Input
              name="lydo"
              id="lydo"
              value={lydo}
              onChange={(e) => setLydo(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="overflow-x-hidden w-full">
          {employeesIsLoading ? (
            <Loading fullScreen />
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-[#37b159] text-white border-b border-slate-200"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="border font-semibold uppercase p-1 py-2 text-center"
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="flex items-center gap-1">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </div>
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <tr
                      key={row.id}
                      className={`bg-white hover:bg-slate-50/50 group transition-colors ${row.getIsSelected() ? "selected" : null}`}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className={`p-1 border uppercase ${cell.column.id === "hoten" ? "text-left pl-2" : "text-center"}`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="lg:w-1/2 mx-auto p-2 mb-4">
          <Input
            placeholder="Nhập MSNV để thêm"
            value={employeeSearch}
            // onChange={(e) => {
            //   if (e.target.value.length > 3) return setEmployeeSearch(e.target.value);
            // }}
            onChange={(e) => setEmployeeSearch(e.target.value)}
          />
          <div className="mt-2 flex flex-col gap-2">
            {employeesFindByStaffId && (
              <div
                onClick={() => {
                  if (!currentEmployees?.some((emp) => emp.msnv === employeesFindByStaffId.msnv)) {
                    setEmployeeSearch("");
                    setCurrentEmployees([...(currentEmployees || []), employeesFindByStaffId]);
                    setRowSelection({ ...rowSelection, [employeesFindByStaffId.id]: true });
                  }
                }}
                className="inline-flex gap-2 items-center border-b cursor-pointer bg-gray-200 p-2 px-4"
              >
                <p className="font-bold">{employeesFindByStaffId.msnv}:</p>
                <p className="font-bold">{employeesFindByStaffId.hoten}</p>
                <p className="font-bold text-red-500">
                  ({linesList.find((line) => line.value === employeesFindByStaffId.bophan)?.name})
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 mx-auto w-full flex justify-center items-center mb-12">
          <Button type="submit" className="min-w-32 uppercase font-bold">
            Tạo đơn
          </Button>
        </div>
      </form>
    </div>
  );
}

export default OvertimeCreate;
