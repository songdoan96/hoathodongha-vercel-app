import { format, subMonths } from "date-fns";
import { FileInput, Search, TableProperties } from "lucide-react";
import { Link } from "react-router";
import Loading from "~/components/Loading";
import SalaryDetail from "~/components/Salaries/SalaryDetail";
import { useSalariesFindOne } from "~/hooks/salaries-hook";
import type { Route } from "./+types/salary-table";
export function meta() {
  return [
    { title: "PHIẾU CHI TIẾT LƯƠNG" },
    { name: "description", content: "PHIẾU CHI TIẾT LƯƠNG" },
  ];
}
export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}
function SalaryTable({ loaderData: id }: Route.ComponentProps) {
  if (!id) return null;
  const { data: salary, isLoading } = useSalariesFindOne(id);
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <>
      <div className="h-12 bg-blue-500 flex gap-4 items-center justify-between px-4">
        <img src="/images/logo.png" alt="" className="w-10" />
        <div className="flex items-center gap-4">
          <Link to={"/luong"} className="text-white flex items-center gap-1">
            <Search />
            <span>Tra cứu</span>
          </Link>
          <Link to={"/luong/tailen"} className="text-white flex items-center gap-1">
            <FileInput />
            <span>Tải file lên</span>
          </Link>
          <Link
            to={"/luong/thongtin?month=" + format(subMonths(new Date(), 1), "yyyy-MM")}
            className="text-white flex items-center gap-1"
          >
            <TableProperties />
            <span>Chi tiết</span>
          </Link>
        </div>
      </div>
      {salary && (
        <div className="w-1/2 mx-auto mt-4">
          <SalaryDetail salary={salary} />
          <div className="mt-4">
            {salary.salaryNotes?.map((note) => (
              <div key={note.id} className="border border-gray-300 p-2 my-2 rounded-md">
                <p className="font-semibold">{note.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SalaryTable;
