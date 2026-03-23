import { addMonths, format, subMonths } from "date-fns";
import { ChevronsLeft, ChevronsRight, CircleCheckBig, CircleX, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { useOvertimesFindAll } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
export function meta() {
  return [{ title: "Danh sách tăng ca bảo vệ" }];
}
function OvertimeSecurityDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const { data, isLoading } = useOvertimesFindAll(month);

  const prevMonth = format(subMonths(new Date(month), 1), "yyyy-MM");
  const nextMonth = format(addMonths(new Date(month), 1), "yyyy-MM");
  return (
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      <HeaderComponent logoLink={routers().overtime.security}>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách đăng ký tăng ca
        </span>
      </HeaderComponent>

      <div className="w-full h-full flex-1">
        {isLoading ? (
          <Loading fullScreen />
        ) : (
          <>
            <div className="overflow-x-auto w-full h-full flex-1">
              <table className="w-full h-full divide-y divide-gray-200  shadow-2xl">
                <thead className="rounded-2xl">
                  <tr className="bg-[#37b159] text-white uppercase">
                    <th className="text-center border p-2 whitespace-nowrap">Ngày tạo</th>
                    <th className="text-center border p-2 whitespace-nowrap">Trạng thái</th>
                    <th className="text-center border p-2 whitespace-nowrap">Bộ phận</th>
                    <th className="text-center border p-2 whitespace-nowrap">Ngày đăng ký</th>
                    <th className="text-center border p-2 whitespace-nowrap">Giờ đăng ký</th>
                    <th className="text-center border p-2 whitespace-nowrap">Lý do</th>
                    <th className="text-center border p-2 whitespace-nowrap">Số lượng</th>
                    <th className="text-center border p-2 whitespace-nowrap">Tổ trưởng</th>
                    <th className="text-center border p-2 whitespace-nowrap">Quản đốc</th>
                    <th className="text-center border p-2 whitespace-nowrap">Ban giám đốc</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((overtime) => (
                    <tr
                      key={overtime.id}
                      className={`${!overtime.status ? "bg-red-50 line-through text-red-500" : ""}`}
                    >
                      <td className="text-center border p-2 whitespace-nowrap">
                        {format(overtime.createdAt, "dd/MM")}
                      </td>
                      <td className="text-center border p-2 whitespace-nowrap">
                        <Link to={routers().overtime.detailSecurity(overtime.id)}>
                          {!overtime.status ? (
                            <div className="bg-red-200 text-red-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <CircleX size={14} />
                              <span className="uppercase font-semibold text-sm"> Bị hủy</span>
                            </div>
                          ) : overtime.lanhdao ? (
                            <div className="bg-green-100 text-green-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <CircleCheckBig size={14} />
                              <span className="uppercase font-semibold text-sm"> Đã duyệt</span>
                            </div>
                          ) : (
                            // <CircleX />
                            <div className="bg-blue-100 text-blue-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <Clock size={14} />
                              <span className="uppercase font-semibold text-sm">Chờ duyệt</span>
                            </div>
                          )}
                        </Link>
                      </td>
                      <td className="text-center border p-2 whitespace-nowrap underline text-blue-600 font-bold">
                        <Link to={routers().overtime.detailSecurity(overtime.id)}>
                          {linesList.find((line) => line.value === overtime.bophan)?.name}
                        </Link>
                      </td>
                      <td className="text-center border p-2">{overtime.ngay}</td>
                      <td className="text-center border p-2 whitespace-nowrap">{overtime.gio}</td>
                      <td className="text-center border p-2 min-w-56">{overtime.lydo}</td>
                      <td className="text-center border p-2 whitespace-nowrap">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={routers().overtime.detailSecurity(overtime.id)}
                              className="underline text-blue-600 font-bold"
                            >
                              {overtime.danhsach.length} người
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {overtime.danhsach.map((person, index) => (
                              <p key={index}>
                                {index + 1}.{person.hoten}
                              </p>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </td>
                      <td className="text-center border p-2 whitespace-nowrap">
                        {overtime.totruong}
                      </td>
                      <td className="text-center border p-2 whitespace-nowrap">
                        {overtime.quandoc}
                      </td>
                      <td className="text-center border p-2 whitespace-nowrap w-40">
                        {overtime.lanhdao}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between px-4 my-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded"
                onClick={() => {
                  setSearchParams({
                    month: prevMonth,
                  });
                }}
              >
                <ChevronsLeft />
                <span>{prevMonth}</span>
              </button>
              <button
                disabled={month === format(new Date(), "yyyy-MM")}
                className={`${month === format(new Date(), "yyyy-MM") ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white flex items-center gap-2 px-4 py-2 rounded`}
                onClick={() => {
                  setSearchParams({
                    month: nextMonth,
                  });
                }}
              >
                <span>{nextMonth}</span>
                <ChevronsRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OvertimeSecurityDashboard;
