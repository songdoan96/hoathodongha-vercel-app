import { addMonths, format, isAfter, isSameDay, subMonths } from "date-fns";
import {
  ChevronsLeft,
  ChevronsRight,
  CircleAlert,
  CircleCheckBig,
  CircleX,
  ClipboardPlus,
  Clock,
  Eye,
  EyeOff,
  FilterIcon,
  Signature,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import {
  useOvertimesDelete,
  useOvertimesFindAll,
  useOvertimesUpdate,
} from "~/hooks/overtimes-hook";
import { checkRole } from "~/lib/helpers";
import routers from "~/lib/routers";
import { linesList, linesListFilter } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { OvertimeType } from "~/types/overtime-type";
export function meta() {
  return [{ title: "Danh sách đăng ký tăng ca" }];
}
function OvertimeDashboard() {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const { data, isLoading } = useOvertimesFindAll(month);
  const { mutate: mutateUpdate } = useOvertimesUpdate();
  const { mutate: mutateDelete } = useOvertimesDelete();
  const [filterLine, setFilterLine] = useState<string>();
  const [overtimes, setOvertimes] = useState<OvertimeType[]>();

  const [filterToday, setFilterToday] = useState<boolean>(false);

  function handleSignature(id: string, bophan: "quandoc" | "lanhdao") {
    if (user) {
      mutateUpdate({
        id,
        formData: {
          [bophan]: user.name,
        },
      });
    }
  }
  function handleCancel(id: string, bophan: "quandoc" | "lanhdao") {
    if (user) {
      mutateUpdate({
        id,
        formData: {
          status: false,
          [bophan]: user.name,
        },
      });
    }
  }
  function handleDelete(id: string) {
    mutateDelete(id);
  }
  const prevMonth = format(subMonths(new Date(month), 1), "yyyy-MM");
  const nextMonth = format(addMonths(new Date(month), 1), "yyyy-MM");
  useEffect(() => {
    if (data && !filterLine) {
      setOvertimes(data);
    }
  }, [data, filterLine]);
  useEffect(() => {
    if (filterLine === "ALL") {
      setOvertimes(data);
    } else if (filterLine === "X1_" || filterLine === "X2_") {
      setOvertimes(data?.filter((overtime) => overtime.bophan.startsWith(filterLine)));
    } else {
      setOvertimes(data?.filter((overtime) => overtime.bophan === filterLine));
    }
  }, [filterLine]);
  // const rows =
  //   filterLine === "ALL"
  //     ? data
  //     : data?.filter((overtime) => overtime.bophan.startsWith(filterLine));

  useEffect(() => {
    if (filterToday) {
      setOvertimes(
        data?.filter(
          (overtime) =>
            overtime.status &&
            overtime.lanhdao &&
            !isAfter(format(new Date(), "yyyy-MM-dd"), format(overtime.denngay, "yyyy-MM-dd")),
        ),
      );
    } else {
      setOvertimes(data);
    }
  }, [filterToday]);

  return (
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      <HeaderComponent>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách đăng ký làm thêm giờ
        </span>
      </HeaderComponent>
      <div className="text-blue-600 my-4 flex justify-center items-center">
        {user && user?.bophan !== "lanhdao" && user?.bophan !== "giamdoc" && (
          <Link
            to={routers().overtime.create}
            className="uppercase font-semibold flex items-center gap-1 bg-blue-100 hover:bg-blue-200 p-2 px-4 rounded"
          >
            <ClipboardPlus />
            <span>Tạo đơn</span>
          </Link>
        )}
        {/* 
          {user &&
          user?.bophan !== "lanhdao" &&
          user?.bophan !== "giamdoc" &&
          !user?.bophan?.includes("quandoc") && (
            <Link
              to={routers().overtime.create}
              className="uppercase font-semibold flex items-center gap-1 bg-blue-100 hover:bg-blue-200 p-2 px-4 rounded"
            >
              <ClipboardPlus />
              <span>Tạo đơn</span>
            </Link>
          )} */}
      </div>

      <div className="w-full h-full flex-1">
        {isLoading ? (
          <Loading fullScreen />
        ) : (
          <>
            <div className="overflow-x-auto w-full h-full flex-1">
              <table className="w-full h-full divide-y divide-gray-200  shadow-2xl">
                <thead className="rounded-2xl">
                  <tr className="bg-[#37b159] text-white uppercase">
                    <th className="text-center border p-1 lg:p-2">
                      Ngày tạo
                      <br />
                      {user?.bophan === "tochuc" && (
                        <button onClick={() => setFilterToday(!filterToday)}>
                          {filterToday ? (
                            <EyeOff color="white" size={20} />
                          ) : (
                            <Eye color="white" size={20} />
                          )}
                        </button>
                      )}
                    </th>
                    <th className="text-center border p-1 lg:p-2">Trạng thái</th>
                    <th className="text-center border p-1 lg:p-2">
                      <span>Bộ phận</span>
                      {user?.bophan === "tochuc" && (
                        <div className="flex gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <FilterIcon color="white" size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Tìm kiếm theo tổ</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {linesListFilter.map((line) => (
                                <DropdownMenuItem
                                  onClick={() => setFilterLine(line.value)}
                                  key={line.value}
                                >
                                  {line.name}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <button
                            className="border p-0.5 bg-red-400"
                            onClick={() => setFilterLine("X1_")}
                          >
                            X1
                          </button>
                          <button
                            className="border p-0.5 bg-yellow-400"
                            onClick={() => setFilterLine("X2_")}
                          >
                            X2
                          </button>

                          <button
                            className="border p-0.5 bg-teal-400"
                            onClick={() => setFilterLine("ALL")}
                          >
                            <X />
                          </button>
                        </div>
                      )}
                    </th>
                    <th className="text-center border p-1 lg:p-2">Ngày đăng ký</th>
                    <th className="text-center border p-1 lg:p-2">Giờ đăng ký</th>
                    <th className="text-center border p-1 lg:p-2">Lý do</th>
                    <th className="text-center border p-1 lg:p-2">Số lượng</th>
                    <th className="text-center border p-1 lg:p-2">Tổ trưởng</th>
                    <th className="text-center border p-1 lg:p-2">Quản đốc</th>
                    <th className="text-center border p-1 lg:p-2">Ban giám đốc</th>
                    <th className="text-center border p-1 lg:p-2 "></th>
                  </tr>
                </thead>
                <tbody>
                  {overtimes?.map((overtime) => (
                    <tr
                      key={overtime.id}
                      className={`${!overtime.status ? "bg-red-50 line-through text-red-500" : ""}`}
                    >
                      <td className="text-center border p-1 lg:p-2">
                        {!overtime.lanhdao &&
                        overtime.status &&
                        (user?.bophan === "lanhdao" || user?.bophan === "giamdoc") &&
                        (!overtime.bophan.startsWith("X") ||
                          (overtime.bophan.startsWith("X") && overtime.quandoc)) ? (
                          <Link
                            to={routers().overtime.edit(overtime.id)}
                            className="underline text-blue-700 font-semibold"
                            title="Sửa đơn"
                          >
                            {format(overtime.createdAt, "dd/MM")}
                          </Link>
                        ) : (
                          <>{format(overtime.createdAt, "dd/MM")}</>
                        )}
                      </td>
                      <td className="text-center border p-1 lg:p-2 whitespace-nowrap">
                        {/* isAfter(new Date(), overtime.denngay) */}
                        <Link to={routers().overtime.detail(overtime.id)}>
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
                          ) : isAfter(
                              format(new Date(), "yyyy-MM-dd"),
                              format(overtime.denngay, "yyyy-MM-dd"),
                            ) ? (
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
                      <td className="text-center border p-1 lg:p-2 underline text-blue-600 font-bold whitespace-nowrap">
                        <Link to={routers().overtime.detail(overtime.id)}>
                          {linesList.find((line) => line.value === overtime.bophan)?.name}
                        </Link>
                      </td>
                      <td className="text-center border p-1 lg:p-2 lg:text-nowrap">
                        {/* {overtime.ngay}
                        <br /> */}
                        {isSameDay(overtime.tungay, overtime.denngay) ? (
                          format(overtime.tungay, "dd/MM")
                        ) : (
                          <>
                            {format(overtime.tungay, "dd/MM")} - {format(overtime.denngay, "dd/MM")}
                          </>
                        )}
                      </td>
                      <td
                        className={`text-center border p-1 lg:p-2 lg:text-nowrap ${overtime.gio.includes("20") ? "text-pink-700 font-semibold" : ""}`}
                      >
                        {overtime.gio}
                      </td>
                      <td className="text-center border p-1 lg:p-2 min-w-56">{overtime.lydo}</td>
                      <td className="text-center border p-1 lg:p-2 text-nowrap">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={routers().overtime.detail(overtime.id)}
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
                      <td className="text-center border p-1 lg:p-2 min-w-32 lg:text-nowrap">
                        {overtime.totruong}
                      </td>
                      <td className="text-center border p-1 lg:p-2  min-w-32 lg:text-nowrap">
                        {overtime.quandoc}
                        {!overtime.quandoc &&
                          user?.bophan === overtime.bophan.slice(0, 3) + "quandoc" && (
                            <div className="flex justify-center items-center gap-2">
                              <Button
                                variant="link"
                                className="text-red-500 inline-flex bg-red-100"
                                onClick={() => handleCancel(overtime.id, "quandoc")}
                              >
                                <Trash2 /> Hủy đơn
                              </Button>
                              <Button
                                variant="link"
                                className="text-blue-500 inline-flex bg-blue-100"
                                onClick={() => handleSignature(overtime.id, "quandoc")}
                              >
                                <Signature /> Ký đơn
                              </Button>
                            </div>
                          )}
                      </td>
                      <td className="text-center border p-1 lg:p-2 min-w-32 lg:text-nowrap">
                        {overtime.lanhdao}
                        {!overtime.lanhdao &&
                          overtime.status &&
                          (user?.bophan === "lanhdao" || user?.bophan === "giamdoc") &&
                          (!overtime.bophan.startsWith("X") ||
                            (overtime.bophan.startsWith("X") && overtime.quandoc)) && (
                            <div className="flex justify-center items-center gap-2">
                              <Button
                                variant="link"
                                className="text-red-500 inline-flex bg-red-100"
                                onClick={() => handleCancel(overtime.id, "lanhdao")}
                              >
                                <Trash2 /> Hủy đơn
                              </Button>
                              <Button
                                variant="link"
                                className="text-blue-500 inline-flex bg-blue-100"
                                onClick={() => handleSignature(overtime.id, "lanhdao")}
                              >
                                <Signature /> Ký đơn
                              </Button>
                            </div>
                          )}
                      </td>
                      <td className="text-center border p-1 lg:p-2 ">
                        {(checkRole("admin") ||
                          (user?.bophan === overtime.bophan && overtime.status)) && (
                          <Button
                            className="bg-red-200"
                            onClick={() => handleDelete(overtime.id)}
                            variant="link"
                          >
                            <Trash2 color="red" />
                          </Button>
                        )}
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

export default OvertimeDashboard;
