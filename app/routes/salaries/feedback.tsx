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
    <div className="bg-white min-h-screen w-screen flex flex-col">
      <div className="bg-primary p-1 flex items-center gap-2 px-8">
        <Link to="/luong">
          <img src="/images/logo.png" className="w-8 md:w-10" alt="Logo" />
        </Link>
        <div className="flex-1 flex gap-8 justify-end items-center">
          <h1 className="text-white font-bold text-2xl text-center uppercase mx-auto">
            Phản hồi lương tháng <span className="bg-blue-50 text-blue-700 px-4">{month}</span>
          </h1>
          <Input
            type="month"
            className="w-46 text-white"
            value={month}
            onChange={(e) =>
              setSearchParams({
                month: e.target.value,
              })
            }
          />
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
      <div className="p-4">
        {isLoading ? (
          <Loading fullScreen />
        ) : (
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default w-full">
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
                      <td className="px-6 py-4 border border-black">
                        {salary.tien_luong_thuc_linh}
                      </td>
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
    </div>
  );
}

export default SalaryFeedback;
