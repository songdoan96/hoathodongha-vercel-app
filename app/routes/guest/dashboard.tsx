import { differenceInMinutes, format } from "date-fns";
import { ArrowRight, Clock, Plus, User } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import GuestIcon from "~/features/guest/components/GuestIcon";
import { useGuestFlowFindAll } from "~/hooks/guestflow-hook";
import routers from "~/lib/routers";

export default function dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") || format(new Date(), "yyyy-MM-dd");

  const { data, isLoading } = useGuestFlowFindAll(date);
  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center w-full">
          <h1 className="uppercase text-xl md:text-2xl text-white font-semibold flex-1 text-center px-4">
            Danh sách Khách Ra Vào Nhà Máy
          </h1>
        </div>
      </HeaderComponent>
      <div className="p-0.5 md:p-2">
        <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-lg">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button className="px-3.5 py-2 font-black rounded-lg transition-colors cursor-pointer bg-blue-800 text-white shadow-xs">
                  Đang ở nhà máy (5)
                </button>
                <button className="px-3.5 py-2 font-bold rounded-lg transition-colors cursor-pointer text-slate-600 hover:text-slate-900">
                  Tất cả hôm nay (0)
                </button>
                <button className="px-3.5 py-2 font-bold rounded-lg transition-colors cursor-pointer text-slate-600 hover:text-slate-900">
                  Đã ra về
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 bg-white border border-slate-300 px-3 py-2 rounded-xl">
                <input
                  className="text-xs sm:text-sm text-slate-800 font-bold focus:outline-none cursor-pointer"
                  type="date"
                  value={date}
                  onChange={(e) => setSearchParams({ date: e.target.value })}
                  max={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
              <Link
                to={routers().guestFlow.add}
                className="text-black flex items-center gap-1 bg-green-300 hover:bg-green-400 uppercase transition-all px-2 py-1 rounded border border-green-600 font-semibold"
              >
                <span>Đăng ký</span>
                <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto my-4 pb-8">
            <div className="table w-full px-1">
              <table className="w-full text-left border">
                <thead>
                  <tr className="border-b-2 border-blue-300 bg-blue-500 text-white font-black uppercase tracking-wider">
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
                <tbody className="divide-y divide-slate-200">
                  {data?.map((guest, index) => {
                    const dave = guest.guestFlowOuts.reduce(
                      (total, out) => total + out.soluong,
                      0,
                    );
                    const conlai = guest.soluongnguoi - dave;
                    return (
                      <tr key={guest.id} className="even:bg-gray-100">
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
                          <div className="flex justify-center items-center gap-2">
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
                          </div>
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
                                  <User color="green" size={16} />
                                  <span className="ml-1 text-orange-700">
                                    {out.soluong} người
                                  </span>
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
