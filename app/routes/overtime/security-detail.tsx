import { format, isSameDay } from "date-fns";
import { Ban, CalendarDays, Clock3, Hash, MessageCircleQuestionMark } from "lucide-react";
import { Link } from "react-router";
import Loading from "~/components/Loading";
import { Checkbox } from "~/components/ui/checkbox";
import { useOvertimesFindOne, useOvertimesUpdate } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import type { OvertimeEmployee } from "~/types/overtime-type";
import type { Route } from "./+types/detail";

export function meta() {
  return [{ title: "PHIẾU ĐĂNG KÝ LÀM THÊM GIỜ BẢO VỆ" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}

export default function OvertimeSecurityDetail({ params: { id } }: Route.LoaderArgs) {
  const { data: overtime, isLoading } = useOvertimesFindOne(id);
  console.log("🚀 ~ OvertimeSecurityDetail ~ overtime:", overtime);
  const { mutate: mutateUpdate, isPending } = useOvertimesUpdate();

  function handleChangeStatus(emp: OvertimeEmployee) {
    if (overtime) {
      const date = format(new Date(), "yyyy-MM-dd");
      mutateUpdate({
        id,
        formData: {
          danhsach: overtime.danhsach.map((item) => {
            if (item.msnv !== emp.msnv) {
              return item;
            }
            const exists = emp?.days?.find((d) => d.day === date);

            if (exists) {
              // Đảo ngược status của ngày hôm nay
              return {
                ...emp,
                days: emp?.days?.map((d) => (d.day === date ? { ...d, status: !d.status } : d)),
              };
            } else {
              // Chưa có ngày hôm nay → thêm mới với status: true
              return {
                ...emp,
                days: [...emp?.days!, { day: date, status: true }],
              };
            }
          }),
        },
      });
    }
  }

  return (
    <div className="bg-green-50 h-full w-full min-h-screen">
      <div className="bg-blue-600 p-2 py-1 flex items-center">
        <Link to={routers().overtime.security}>
          <img src="/images/logo.png" className="w-8" alt="" />
        </Link>
        <h1 className="mx-auto text-white font-bold lg:text-2xl">PHIẾU ĐĂNG KÝ LÀM THÊM GIỜ</h1>
      </div>
      {isLoading && <Loading fullScreen />}
      <div className="p-1 lg:p-4">
        {overtime && (
          <div className="lg:max-w-5xl mx-auto border p-1 py-4 shadow-2xl rounded-xl bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-2 lg:px-8 gap-y-4 w-full">
              <div className="flex gap-2 items-center">
                <Hash color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Bộ phận</span>
                <span>: {linesList.find((line) => line.value === overtime.bophan)?.name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarDays color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Ngày</span>
                <span>
                  :
                  {isSameDay(overtime.tungay, overtime.denngay) ? (
                    format(overtime.tungay, "dd/MM")
                  ) : (
                    <>
                      {format(overtime.tungay, "dd/MM")} - {format(overtime.denngay, "dd/MM")}
                    </>
                  )}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Clock3 color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Giờ</span>
                <span className="flex-1">: {overtime?.gio}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircleQuestionMark color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Lý do</span>
                <span className="flex-1">: {overtime?.lydo}</span>
              </div>
            </div>

            {overtime.status ? (
              <>
                <h1 className="uppercase text-center my-8 font-semibold border-y py-2 text-xl lg:text-2xl shadow text-blue-900">
                  Danh sách lao động đăng ký tự nguyện làm thêm giờ
                </h1>
                <table className="table w-full bg-white">
                  <thead>
                    <tr className="bg-[#37b159] text-white uppercase">
                      <th className="text-center border p-1">STT</th>
                      <th className="text-center border p-1">Họ tên</th>
                      <th className="text-center border p-1">MSNV</th>
                      <th className="text-center border p-1">Có mặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overtime?.danhsach.map((emp, index) => (
                      <tr
                        key={index}
                        className="bg-green-50 text-green-900 uppercase font-semibold"
                      >
                        <td className="text-center border p-1">
                          <div className="flex justify-center items-center gap-4">
                            <span>{index + 1}</span>
                          </div>
                        </td>
                        <td className="text-center border p-1">{emp.hoten}</td>
                        <td className="text-center border p-1">{emp.msnv}</td>
                        <td className="text-center border p-1">
                          {overtime.lanhdao && (
                            <Checkbox
                              disabled={isPending}
                              checked={
                                emp.days?.find((d) => d.day === format(new Date(), "yyyy-MM-dd"))
                                  ?.status || false
                              }
                              onCheckedChange={() => handleChangeStatus(emp)}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-4 my-4 py-6 text-red-600 bg-red-50">
                <Ban size={30} />
                <h1 className="text-center text-2xl lg:text-3xl uppercase font-semibold px-12 lg:px-0">
                  Đơn tăng ca không có hiệu lực
                </h1>
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 mt-10">
              <div className="flex flex-col items-center gap-2">
                <span className="uppercase font-bold text-blue-600 text-xl">Tổ trưởng</span>
                <span className="text-center text-green-900">{overtime?.totruong}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="uppercase font-bold text-blue-600 text-xl">Quản đốc</span>
                <span className="text-center text-green-900">{overtime.quandoc}</span>
              </div>

              <div className="flex flex-col items-center col-span-2 lg:col-span-1 gap-2">
                <span className="uppercase font-bold text-blue-600 text-xl">Ban giám đốc</span>
                <span className="text-center text-green-900">{overtime.lanhdao}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
