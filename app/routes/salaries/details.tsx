import { format } from "date-fns";
import { CalendarRangeIcon, ClipboardPenLine, DollarSign } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import SalaryDetail from "~/components/Salaries/SalaryDetail";
import SalaryFeedbackChat from "~/components/Salaries/SalaryFeedbackChat";
import SalaryFeedbackFormComponent from "~/components/Salaries/SalaryFeedbackForm";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSalariesDetails } from "~/hooks/salaries-hook";
import { formatMoney } from "~/lib/helpers";
import useSalaryStore from "~/stores/salary-store";

export function meta() {
  return [
    { title: "PHIẾU CHI TIẾT LƯƠNG THÁNG" },
    { name: "description", content: "PHIẾU CHI TIẾT LƯƠNG THÁNG" },
  ];
}

function SalaryDetailsPage() {
  const { cccd, msnv } = useSalaryStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const { data, isLoading } = useSalariesDetails({
    month,
    msnv,
    cccd,
  });
  const { salary, salaries } = data || {};
  const totalIncome =
    salaries?.reduce((acc, salary) => {
      return acc + (salary.tien_luong_thuc_linh || 0);
    }, 0) || 0;

  return (
    <div className="bg-[#f4f7fd] min-h-screen w-full flex flex-col">
      <div className="bg-primary p-1 md:p-2 flex items-center gap-2">
        <Link to="/luong">
          <img src="/images/logo.png" className="w-8 md:w-10" alt="Logo" />
        </Link>
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-white font-bold text-[18px] md:text-3xl text-center">
            CTY MAY HOÀ THỌ ĐÔNG HÀ
          </h1>
        </div>
      </div>
      {isLoading && <Loading fullScreen />}
      <div className="w-full md:w-2/3 mx-auto p-2 md:p-4">
        <div className="flex gap-1 items-center p-2 py-4 bg-white mb-4 rounded">
          <div className="flex-1 flex items-center justify-between md:justify-start gap-4">
            <Label htmlFor="month">
              <CalendarRangeIcon size={30} color="teal" />
            </Label>
            <Input
              name="month"
              id="month"
              type="month"
              value={month}
              className="w-fit border-gray-500"
              onChange={(e) =>
                setSearchParams({
                  month: e.target.value,
                })
              }
            />
          </div>
        </div>
        {salary && (
          <>
            <SalaryDetail salary={salary} />
            <div className="py-4 bg-white p-4 mt-4 shadow-lg">
              <p className="text-red-700 text-sm md:text-base text-center font-semibold">
                Lưu ý: Nếu CBCNV nào có thắc mắc vui lòng nhập nội dung vào bên dưới để khiếu nại.
              </p>
              <SalaryFeedbackChat salary={salary} />

              <div className="flex justify-center items-center w-full md:w-2/3 mx-auto mt-2">
                <SalaryFeedbackFormComponent id={salary.id} isEmployee={true} />
              </div>
            </div>
          </>
        )}

        {/* {salaries && salaries?.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-2 md:gap-4 justify-between items-center border p-2 bg-white shadow-lg">
              <span className="text-teal-600 font-bold uppercase text-xl">
                Tổng thu nhập năm {format(month, "yyyy")}:
              </span>
              <span className="text-blue-600 font-semibold text-3xl">
                {formatMoney(totalIncome)}
              </span>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 justify-between items-center border p-2 bg-white shadow-lg">
              <span className="text-teal-600 font-bold uppercase text-xl">
                TNBQ năm {format(month, "yyyy")}:
              </span>
              <span className="text-blue-600 font-semibold text-3xl">
                {formatMoney(totalIncome / salaries.length)}
              </span>
            </div>
          </div>
        )} */}

        <div className="mt-4 py-4 flex justify-center items-center gap-4">
          <Link
            to="/luong"
            className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
          >
            <DollarSign /> <span>Tra cứu lương</span>
          </Link>
          <Link
            to="/tao-don"
            className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
          >
            <ClipboardPenLine /> <span>Tạo đơn nghỉ phép</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SalaryDetailsPage;
