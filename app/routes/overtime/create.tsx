import { format } from "date-fns";
import { CalendarDays, CheckIcon, Clock3, Hash, MessageCircleQuestionMark } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useEmployeesFindWithLine } from "~/hooks/employees-hook";
import { useOvertimesCreate } from "~/hooks/overtimes-hook";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { EmployeeType } from "~/types/employee-type";

export function meta() {
  return [{ title: "ĐĂNG KÝ TĂNG CA" }];
}

export default function EmployeeTable() {
  const { user } = useAuthStore();
  if (!user) {
    return null;
  }
  const { data: employeesData, isLoading: employeesIsLoading } = useEmployeesFindWithLine(
    user.bophan,
  );
  const [rows, setRows] = useState<(EmployeeType & { checked: boolean; congdoan: string })[]>();
  const [selectAll, setSelectAll] = useState(false);
  const [tungay, setTuNgay] = useState(format(new Date(), "yyyy-MM-dd"));
  const [denngay, setDenngay] = useState(format(new Date(), "yyyy-MM-dd"));
  const [gioDangKy, setGioDangKy] = useState("");
  const [lydo, setLydo] = useState("");
  const mutate = useOvertimesCreate();

  useEffect(() => {
    setRows(employeesData?.map((r) => ({ ...r, checked: false, congdoan: "" })));
  }, [employeesData]);

  const toggleRow = (id: string) => {
    setRows((prev) => prev?.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r)));
  };

  const toggleAll = () => {
    const next = !selectAll;
    setSelectAll(next);
    setRows((prev) => prev?.map((r) => ({ ...r, checked: next })));
  };

  const updateCongDoan = (id: string, value: string) => {
    if (value.length > 0) {
      return setRows((prev) =>
        prev?.map((r) => (r.id === id ? { ...r, congdoan: value, checked: true } : r)),
      );
    }
    return setRows((prev) =>
      prev?.map((r) => (r.id === id ? { ...r, checked: false, congdoan: "" } : r)),
    );
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const filterChecked = rows?.filter((r) => r.checked);
    if (user?.bophan && filterChecked) {
      mutate.mutate({
        bophan: user?.bophan,
        // ngay: ngayDangKy,
        gio: gioDangKy,
        lydo,
        totruong: user.name,
        danhsach: filterChecked.map((emp) => ({
          msnv: emp.msnv,
          hoten: emp.hoten,
          congdoan: emp.congdoan,
        })),
        tungay,
        denngay,
      });
    }
  }

  const checkedCount = rows?.filter((r) => r.checked).length;
  if (employeesIsLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="w-full h-full">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <HeaderComponent>
        <HeaderTitle>ĐĂNG KÝ TĂNG CA</HeaderTitle>
      </HeaderComponent>
      <form onSubmit={handleSubmit}>
        <div className="p-2 py-4 flex flex-col gap-2 uppercase bg-green-100 lg:max-w-4xl lg:px-8 mx-auto">
          <div className="flex gap-2 items-center">
            <Hash color="red" size={24} />
            <Label htmlFor="bophan" className="font-semibold text-green-800 w-20">
              Bộ phận
            </Label>
            <span className="flex-1 ml-auto bg-white p-2 py-1 text-green-800 border rounded font-semibold">
              {linesList.find((line) => line.value === user?.bophan)?.name}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <CalendarDays color="red" size={24} />
            <Label htmlFor="tungay" className="font-semibold text-green-800 w-20">
              Từ ngày
            </Label>
            <Input
              type="date"
              name="tungay"
              id="tungay"
              value={tungay}
              onChange={(e) => setTuNgay(e.target.value)}
              required
              className="flex-1 ml-auto bg-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <CalendarDays color="red" size={24} />
            <Label htmlFor="denngay" className="font-semibold text-green-800 w-20">
              Đến ngày
            </Label>
            <Input
              type="date"
              name="denngay"
              id="denngay"
              value={denngay}
              onChange={(e) => setDenngay(e.target.value)}
              required
              className="flex-1 ml-auto bg-white"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Clock3 color="red" size={24} />
            <Label htmlFor="gio" className="font-semibold text-green-800 w-20">
              Giờ ĐK
            </Label>
            <Input
              name="gio"
              id="gio"
              value={gioDangKy}
              onChange={(e) => setGioDangKy(e.target.value)}
              required
              className="flex-1 ml-auto bg-white"
            />
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircleQuestionMark color="red" size={24} />
            <Label htmlFor="lydo" className="font-semibold text-green-800 underline w-20">
              Lý do:
            </Label>
            <Input
              name="lydo"
              id="lydo"
              value={lydo}
              onChange={(e) => setLydo(e.target.value)}
              required
              className="flex-1 bg-white ml-auto"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full lg:max-w-4xl mx-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f766e] text-white">
                <th className="border p-1 text-center">
                  <div className="flex justify-center items-center">
                    <input type="checkbox" checked={selectAll} onChange={toggleAll} />
                  </div>
                </th>
                <th className="border p-1 text-center">STT</th>
                <th className="border p-1 text-center">MSNV</th>
                <th className="border p-1 text-center">HỌ TÊN</th>
                <th className="border p-1 text-center">CÔNG ĐOẠN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {rows?.map((row, i) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer ${row.checked ? "bg-[#dcf1e7]" : "bg-white"}`}
                >
                  <td className="border p-1">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={row.checked}
                        onChange={() => toggleRow(row.id)}
                        className="w-4"
                      />
                    </div>
                  </td>
                  <td className="border p-1 text-center" onClick={() => toggleRow(row.id)}>
                    {i + 1}
                  </td>
                  <td
                    className="border p-1 font-semibold text-green-800 text-center"
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.msnv}
                  </td>
                  <td
                    className="border p-1 max-w-32 font-semibold text-blue-800 text-center"
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.hoten}
                  </td>
                  <td className="border p-1">
                    <div className="flex justify-center items-center">
                      <input
                        value={row.congdoan}
                        onChange={(e) => updateCongDoan(row.id, e.target.value)}
                        placeholder="Công đoạn?"
                        className="w-26 lg:w-auto p-1 border border-blue-200 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 mb-20 flex justify-center items-center ">
          <Button
            className="min-w-32 uppercase font-bold"
            disabled={checkedCount === 0}
            type="submit"
          >
            <CheckIcon size={20} /> Tạo đơn
          </Button>
        </div>
      </form>
    </div>
  );
}
