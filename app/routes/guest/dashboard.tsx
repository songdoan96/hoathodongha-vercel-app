import { differenceInMinutes, format } from "date-fns";
import { ArrowRight, Clock, Factory, LogOut, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import GuestIcon from "~/features/guest/components/GuestIcon";
import { useGuestFlowFindAll } from "~/hooks/guestflow-hook";
import routers from "~/lib/routers";

export default function dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");
  const { data, isLoading } = useGuestFlowFindAll(date);
  const [filter, setFilter] = useState<"all" | "leave" | "here">("here");
  const [dataFilter, setDataFilter] = useState<GuestFlowType[]>();
  const [countAllCustomer, setCountAllCustomer] = useState(0);
  const [countHereCustomer, setCountHereCustomer] = useState(0);
  const [countLeaveCustomer, setCountLeaveCustomer] = useState(0);
  useEffect(() => {
    if (!data) return;
    var countAll = 0,
      countHere = 0,
      countLeave = 0;
    data.forEach((guest) => {
      countAll += guest.soluongnguoi;
      const dave = guest.guestFlowOuts.reduce(
        (total, out) => total + out.soluong,
        0,
      );
      if (dave < guest.soluongnguoi) countHere += guest.soluongnguoi - dave;
      if (dave === guest.soluongnguoi) countLeave += guest.soluongnguoi;
    });
    setCountAllCustomer(countAll);
    setCountHereCustomer(countHere);
    setCountLeaveCustomer(countLeave);
  }, [data]);
  useEffect(() => {
    if (!data) return;
    if (filter === "all") {
      return setDataFilter(data);
    }
    if (filter === "here") {
      const dHere = data.filter((guest) => {
        const dave = guest.guestFlowOuts.reduce(
          (total, out) => total + out.soluong,
          0,
        );
        if (dave < guest.soluongnguoi) return guest;
      });
      return setDataFilter(dHere);
    }
    if (filter === "leave") {
      const dLeave = data.filter((guest) => {
        const dave = guest.guestFlowOuts.reduce(
          (total, out) => total + out.soluong,
          0,
        );
        if (dave === guest.soluongnguoi) return guest;
      });
      return setDataFilter(dLeave);
    }
  }, [filter, data]);

  if (isLoading) return <Loading fullScreen />;
  return (
    <div className="bg-white">
      {/*  Danh sách Khách Ra Vào Nhà Máy */}
      <div className="flex bg-(--primary-bg) p-1 items-center">
        <img src="/images/logo.png" className="w-10" alt="" />
        <div className="mx-auto">
          <h1 className="text-center uppercase text-white font-semibold text-xl md:text-2xl">
            Danh sách Khách hàng <br className="md:hidden" /> Ra Vào Nhà Máy
          </h1>
        </div>
      </div>
      <div className="p-1 md:p-2">
        <div className="bg-white overflow-hidden min-h-screen">
          <div className="p-1 md:p-4 md:py-6 shadow border border-blue-300 mb-4 rounded-xl">
            <div className="flex gap-2 w-full">
              <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-4 ">
                <button
                  onClick={() => setFilter("here")}
                  className={`rounded-xl p-2 flex gap-1 items-center border border-slate-600 shadow text-slate-600 font-semibold ${filter === "here" && "bg-(--primary-bg) text-white"}`}
                >
                  <Factory />
                  <span>Đang ở nhà máy</span>
                  <span className="ml-auto">({countHereCustomer})</span>
                </button>
                <button
                  onClick={() => setFilter("all")}
                  className={`rounded-xl p-2 flex gap-1 items-center border border-slate-600 shadow text-slate-600 font-semibold ${filter === "all" && "bg-(--primary-bg) text-white"}`}
                >
                  <Users />
                  <span>Tất cả hôm nay</span>
                  <span className="ml-auto">({countAllCustomer})</span>
                </button>
                <button
                  onClick={() => setFilter("leave")}
                  className={`rounded-xl p-2 flex gap-1 items-center border border-slate-600 shadow text-slate-600 font-semibold ${filter === "leave" && "bg-(--primary-bg) text-white"}`}
                >
                  <LogOut />
                  <span>Đã ra về</span>
                  <span className="ml-auto">({countLeaveCustomer})</span>
                </button>
              </div>
              <div className="flex flex-col w-1/3 gap-2 md:flex-row md:justify-end">
                <Link
                  to={routers().guestFlow.add}
                  className="flex items-center gap-1 bg-green-300 text-green-900 hover:bg-green-400 uppercase transition-all py-2 px-1 rounded border border-green-600 font-semibold md:order-1"
                >
                  <span>Đăng ký</span>
                  <ArrowRight />
                </Link>
                <div className="flex items-center gap-1.5 bg-white border border-slate-300 px-3 py-2 rounded-xl">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setSearchParams({ date: e.target.value })}
                    max={format(new Date(), "yyyy-MM-dd")}
                    className="text-xs sm:text-sm text-slate-800 font-bold focus:outline-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="table w-full border border-blue-300 shadow rounded-xl overflow-hidden min-h-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-(--primary-bg) text-white font-black uppercase tracking-wider">
                    <th className="p-2 whitespace-nowrap">Khách</th>
                    <th className="p-2 whitespace-nowrap text-center">
                      Số Người
                    </th>
                    <th className="p-2 whitespace-nowrap text-center">
                      Phương Tiện
                    </th>
                    <th className="p-2 whitespace-nowrap text-center">
                      Giờ Vào
                    </th>
                    <th className="p-2 whitespace-nowrap text-center">Ở Lại</th>
                    <th className="p-2 whitespace-nowrap text-center">
                      Giờ Ra
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataFilter?.map((guest, index) => {
                    const dave = guest.guestFlowOuts.reduce(
                      (total, out) => total + out.soluong,
                      0,
                    );
                    const conlai = guest.soluongnguoi - dave;
                    return (
                      <tr key={guest.id} className="border-b border-blue-300">
                        <td className="p-2 min-w-30 pl-2 font-bold text-slate-900 text-sm sm:text-base leading-tight">
                          {index + 1}. {guest.khachhang}
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          {conlai === 0 && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-900 ring-1 ring-inset">
                              Về hết {guest.soluongnguoi} người
                            </span>
                          )}
                          <Link to={routers().guestFlow.out(guest.id)}>
                            {conlai === guest.soluongnguoi && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-600 ring-1 ring-inset">
                                Còn {guest.soluongnguoi} người
                              </span>
                            )}
                            {conlai > 0 && conlai < guest.soluongnguoi && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-200 text-orange-600 ring-1 ring-inset">
                                Còn {conlai} / {guest.soluongnguoi} người
                              </span>
                            )}
                          </Link>
                        </td>
                        <td className="p-2 whitespace-nowrap text-center">
                          <Link
                            to={routers().guestFlow.out(guest.id)}
                            className="flex justify-center items-center gap-2"
                          >
                            <GuestIcon
                              id={guest.phuongtien}
                              isActive={true}
                              size={30}
                            />
                            {guest.bienso && (
                              <span className="bg-gray-200 border border-blue-900 px-2 py-px text-blue-900 font-bold text-xs">
                                {guest.bienso}
                              </span>
                            )}
                          </Link>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="flex flex-col items-center">
                            <div className="font-mono font-black text-slate-900 text-sm sm:text-base tabular-nums">
                              {format(guest.createdAt, "HH:mm")}
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                              {format(guest.createdAt, "dd/MM/yyyy")}
                            </div>
                          </div>
                        </td>

                        <td className="p-2 whitespace-nowrap text-center font-mono font-black text-slate-900 tabular-nums ">
                          {conlai === 0
                            ? (
                                differenceInMinutes(
                                  new Date(guest.guestFlowOuts.at(0)!.giora),
                                  new Date(guest.createdAt),
                                ) / 60
                              ).toFixed(1) + "h"
                            : (
                                differenceInMinutes(
                                  new Date(),
                                  new Date(guest.createdAt),
                                ) / 60
                              ).toFixed(1) + "h"}
                        </td>
                        <td className="p-2 whitespace-nowrap w-46">
                          {guest.guestFlowOuts.length > 0 ? (
                            <ul className="flex flex-col text-xs sm:text-sm font-semibold">
                              {guest.guestFlowOuts.map((out) => (
                                <li
                                  key={out.id}
                                  className="list-disc flex items-center"
                                >
                                  <Clock color="green" size={16} />
                                  <span className="ml-1 w-16 text-orange-700">
                                    {format(out.giora, "HH:mm")}
                                  </span>
                                  {out.ghichu ? (
                                    <Tooltip>
                                      <TooltipTrigger className="flex">
                                        <User color="green" size={16} />
                                        <span className="ml-1 text-orange-700">
                                          {out.soluong} người
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {out.ghichu}
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    <>
                                      {" "}
                                      <User color="green" size={16} />
                                      <span className="ml-1 text-orange-700">
                                        {out.soluong} người
                                      </span>
                                    </>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-slate-600 text-xs sm:text-sm font-semibold italic">
                              Chưa ra
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
