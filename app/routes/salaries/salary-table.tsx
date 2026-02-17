import { format, subMonths } from "date-fns";
import { FileInput, Search, TableProperties } from "lucide-react";
import { Link } from "react-router";
import Loading from "~/components/Loading";
import SalaryDetail from "~/components/Salaries/SalaryDetail";
import { useSalariesFindOne } from "~/hooks/salaries-hook";
import type { Route } from "./+types/salary-table";
import SalaryFeedbackChat from "~/components/Salaries/SalaryFeedbackChat";
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
    <div className="w-full">
      <div className="w-full p-2 bg-blue-500 flex flex-col md:flex-row gap-1 items-center justify-between">
        <img src="/images/logo.png" alt="" className="w-10 h-full" />
        <div className="flex items-center justify-center gap-4">
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
        <div className="w-full md:w-1/2 mx-auto p-1">
          <SalaryDetail salary={salary} />
          <div className="mt-4 bg-gray-100 p-2">
            <SalaryFeedbackChat salary={salary} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryTable;
