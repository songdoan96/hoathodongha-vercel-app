import { format, subMonths } from "date-fns";
import { FileInput, MessageCircleQuestionMark, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import SalaryFeedbackChatComponent from "~/components/Salaries/SalaryFeedbackChat";
import SalaryFeedbackFormComponent from "~/components/Salaries/SalaryFeedbackForm";
import { Input } from "~/components/ui/input";
import { useSalariesFeedback } from "~/hooks/salaries-hook";

function SalaryFeedback() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(subMonths(new Date(), 1), "yyyy-MM");
  const { data: salaries, isLoading } = useSalariesFeedback(month);

  return (
    <div className="bg-white w-full flex flex-col">
      <div className="bg-primary p-1 flex items-center gap-2">
        <Link to="/luong">
          <img src="/images/logo.png" className="w-8 md:w-10" alt="Logo" />
        </Link>
        <div className="flex-1 flex gap-1 md:gap-4 justify-end items-center">
          <Link to={"/luong"} className="text-white flex items-center gap-1">
            <Search />
            <span>Tra cứu</span>
          </Link>
          <Link to={"/luong/tailen"} className="text-white flex items-center gap-1">
            <FileInput />
            <span>Tải file lên</span>
          </Link>
          <Link to={"/luong/phanhoi"} className="text-white flex items-center gap-1">
            <MessageCircleQuestionMark />
            <span>Phản hồi</span>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 bg-gray-200 p-1 w-full">
            <h1 className="text-blue-700 font-bold text-xl md:text-2xl text-center uppercase mx-auto">
              Phản hồi lương tháng
              <span className="bg-blue-500 text-white px-1 md:px-4 ml-2">{month}</span>
            </h1>
            <Input
              type="month"
              className="w-50 bg-blue-500 text-white border-white border-2"
              value={month}
              onChange={(e) =>
                setSearchParams({
                  month: e.target.value,
                })
              }
            />
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-body bg-gray-50">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium border border-black">
                  Tổ
                </th>
                <th scope="col" className="px-6 py-3 font-medium border border-black">
                  Họ tên
                </th>
                <th scope="col" className="px-6 py-3 font-medium border border-black">
                  MSNV
                </th>
                <th scope="col" className="px-6 py-3 font-medium border border-black">
                  Lương thực lĩnh
                </th>
                <th scope="col" className="px-6 py-3 font-medium border border-black">
                  Thắc mắc
                </th>
              </tr>
            </thead>
            <tbody>
              {salaries &&
                salaries.map((salary) => (
                  <tr key={salary.id} className="bg-neutral-primary border-b border-default">
                    <th className="px-6 py-4 border border-black">{salary.to}</th>
                    <td className="px-6 py-4 border border-black">
                      <Link
                        className="underline text-blue-600"
                        to={`/luong/bangluong/${salary.id}`}
                      >
                        {salary.hoten}
                      </Link>
                    </td>
                    <td className="px-6 py-4 border border-black">{salary.msnv}</td>
                    <td className="px-6 py-4 border border-black">{salary.tien_luong_thuc_linh}</td>
                    <td className="border w-1/2 border-black">
                      <div className="p-2">
                        <SalaryFeedbackChatComponent salary={salary} />
                        <div className="mt-4">
                          <SalaryFeedbackFormComponent id={salary.id} isEmployee={false} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalaryFeedback;
