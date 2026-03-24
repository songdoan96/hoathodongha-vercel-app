import { format, isAfter, isSameDay } from "date-fns";
import { CircleAlert, CircleCheckBig, CircleX, Clock } from "lucide-react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { useOvertimesFindAll, useOvertimesSecurityFindAll } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
export function meta() {
  return [{ title: "Danh sách tăng ca bảo vệ" }];
}
function OvertimeSecurityDashboard() {
  // const { data, isLoading } = useOvertimesFindAll(format(new Date(), "yyyy-MM"));
  const { data, isLoading } = useOvertimesSecurityFindAll();

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
                        {/* <Link to={routers().overtime.detailSecurity(overtime.id)}>
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
                            <div className="bg-blue-100 text-blue-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <Clock size={14} />
                              <span className="uppercase font-semibold text-sm">Chờ duyệt</span>
                            </div>
                          )}
                        </Link> */}

                        <Link to={routers().overtime.detailSecurity(overtime.id)}>
                          {!overtime.status ? (
                            <div className="bg-red-200 text-red-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <CircleX size={14} />
                              <span className="uppercase font-semibold text-sm"> Bị hủy</span>
                            </div>
                          ) : !overtime.lanhdao ? (
                            <div className="bg-blue-100 text-blue-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <Clock size={14} />
                              <span className="uppercase font-semibold text-sm">Chờ duyệt</span>
                            </div>
                          ) : isAfter(new Date(), overtime.denngay) ? (
                            <div className="bg-yellow-100 text-yellow-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <CircleAlert size={14} />
                              <span className="uppercase font-semibold text-sm">Hết hạn</span>
                            </div>
                          ) : (
                            <div className="bg-green-100 text-green-700 p-1 px-2 rounded flex items-center justify-center gap-1">
                              <CircleCheckBig size={14} />
                              <span className="uppercase font-semibold text-sm">Đã duyệt</span>
                            </div>
                          )}
                        </Link>
                      </td>
                      <td className="text-center border p-2 whitespace-nowrap underline text-blue-600 font-bold">
                        <Link to={routers().overtime.detailSecurity(overtime.id)}>
                          {linesList.find((line) => line.value === overtime.bophan)?.name}
                        </Link>
                      </td>
                      <td className="text-center border p-2">
                        {isSameDay(overtime.tungay, overtime.denngay) ? (
                          format(overtime.tungay, "dd/MM")
                        ) : (
                          <>
                            {format(overtime.tungay, "dd/MM")} - {format(overtime.denngay, "dd/MM")}
                          </>
                        )}
                      </td>
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
          </>
        )}
      </div>
    </div>
  );
}

export default OvertimeSecurityDashboard;
