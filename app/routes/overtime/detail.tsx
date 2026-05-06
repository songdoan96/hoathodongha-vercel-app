import { eachDayOfInterval, format, isAfter, isSameDay } from "date-fns";
import {
  Ban,
  CalendarDays,
  CircleCheckBig,
  Clock3,
  Hash,
  MessageCircleQuestionMark,
  Plus,
  Signature,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useOvertimesFindOne, useOvertimesUpdate } from "~/hooks/overtimes-hook";
import { checkRole } from "~/lib/helpers";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { Route } from "./+types/detail";
import { useState } from "react";

export function meta() {
  return [{ title: "PHIẾU ĐĂNG KÝ LÀM THÊM GIỜ" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}
function OvertimeCreate({ params: { id } }: Route.LoaderArgs) {
  const { data: overtime, isLoading } = useOvertimesFindOne(id);
  const { user } = useAuthStore();
  const { mutate: mutateUpdate } = useOvertimesUpdate();
  const [employeeAdd, setEmployeeAdd] = useState({ hoten: "", msnv: "", congdoan: "" });
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
  function handleCancel(id: string) {
    if (user) {
      mutateUpdate({
        id,
        formData: {
          status: false,
          lanhdao: user.name,
        },
      });
    }
  }
  function handleDeleteEmployee(msnv: string) {
    if (user && overtime) {
      mutateUpdate({
        id,
        formData: {
          danhsach: overtime.danhsach.filter((item) => item.msnv !== msnv),
        },
      });
    }
  }
  function handleAddEmployee() {
    if (employeeAdd.hoten && employeeAdd.msnv) {
      mutateUpdate({
        id,
        formData: {
          danhsach: [...overtime?.danhsach!, employeeAdd],
        },
      });
    }
  }
  return (
    <div className="bg-green-50 h-full w-full min-h-screen">
      <div className="bg-blue-600 p-2 py-1 flex items-center">
        <Link to={routers().overtime.dashboard}>
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
            {overtime.status && (
              <h1 className="uppercase text-center my-8 font-semibold border-y py-2 text-xl lg:text-2xl shadow text-blue-900">
                Danh sách lao động đăng ký tự nguyện làm thêm giờ
              </h1>
            )}
            {overtime.status ? (
              <div className="relative overflow-x-auto">
                <table className="table w-full bg-white">
                  <thead>
                    <tr className="bg-[#37b159] text-white uppercase">
                      <th className="text-center border p-1">STT</th>
                      <th className="text-center border p-1">Họ tên</th>
                      <th className="text-center border p-1">MSNV</th>
                      {user?.bophan !== "tochuc" && (
                        <th className="text-center border p-1">Công đoạn</th>
                      )}
                      {isSameDay(overtime.tungay, overtime.denngay) ? (
                        <th className="text-center border p-1">Có mặt</th>
                      ) : (
                        eachDayOfInterval({
                          start: new Date(overtime.tungay),
                          end: isAfter(new Date(), new Date(overtime.denngay))
                            ? new Date(overtime.denngay)
                            : new Date(),
                        }).map((day, index) => (
                          <th key={index} className="text-center border p-1">
                            {format(day, "dd/MM")}
                          </th>
                        ))
                      )}
                      {checkRole("tochuc") && <th className="text-center border p-1">Ký tên</th>}
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
                            {checkRole("admin") && (
                              <Button
                                className="bg-red-50"
                                onClick={() => handleDeleteEmployee(emp.msnv)}
                                variant="link"
                              >
                                <Trash2 color="red" />
                              </Button>
                            )}
                          </div>
                        </td>
                        <td className="text-center border p-1 text-nowrap">{emp.hoten}</td>
                        <td className="text-center border p-1">{emp.msnv}</td>
                        {user?.bophan !== "tochuc" && (
                          <td className="text-center border p-1">{emp.congdoan}</td>
                        )}
                        {isSameDay(overtime.tungay, overtime.denngay) ? (
                          <td className="text-center border p-1">
                            <div className="flex items-center justify-center">
                              {emp.days?.find((d) => d.day === format(new Date(), "yyyy-MM-dd"))
                                ?.status && <CircleCheckBig />}
                            </div>
                            {/* <Checkbox
                              disabled
                              checked={
                                emp.days?.find((d) => d.day === format(new Date(), "yyyy-MM-dd"))
                                  ?.status || false
                              }
                            /> */}
                          </td>
                        ) : (
                          eachDayOfInterval({
                            start: new Date(overtime.tungay),
                            end: isAfter(new Date(), new Date(overtime.denngay))
                              ? new Date(overtime.denngay)
                              : new Date(),
                          }).map((day, index) => (
                            <td key={index} className="text-center border p-1">
                              {/* <Checkbox
                                key={index}
                                disabled
                                checked={
                                  emp.days?.find((d) => d.day === format(day, "yyyy-MM-dd"))
                                    ?.status || false
                                }
                              /> */}
                              <div className="flex items-center justify-center">
                                {emp.days?.find((d) => d.day === format(day, "yyyy-MM-dd"))
                                  ?.status && <CircleCheckBig />}
                              </div>
                            </td>
                          ))
                        )}

                        {checkRole("tochuc") && <td className="text-center border p-1"></td>}
                      </tr>
                    ))}
                    {(user?.bophan === "admin" ||
                      user?.bophan === "lanhdao" ||
                      user?.bophan === "giamdoc") && (
                      <tr>
                        <td className="text-center border p-1 uppercase text-blue-500 font-semibold">
                          Thêm
                        </td>
                        <td className="text-center border p-1">
                          <Input
                            type="text"
                            placeholder="Họ tên"
                            value={employeeAdd.hoten}
                            onChange={(e) =>
                              setEmployeeAdd({ ...employeeAdd, hoten: e.target.value })
                            }
                          />
                        </td>
                        <td className="text-center border p-1">
                          <Input
                            type="text"
                            placeholder="MSNV"
                            value={employeeAdd.msnv}
                            onChange={(e) =>
                              setEmployeeAdd({ ...employeeAdd, msnv: e.target.value })
                            }
                          />
                        </td>
                        <td className="text-center border p-1">
                          <Input
                            type="text"
                            placeholder="Công đoạn"
                            value={employeeAdd.congdoan}
                            onChange={(e) =>
                              setEmployeeAdd({ ...employeeAdd, congdoan: e.target.value })
                            }
                          />
                        </td>
                        <td className="text-center border p-1">
                          <button
                            onClick={handleAddEmployee}
                            className="bg-blue-500 text-white rounded py-2 px-4"
                          >
                            <Plus />
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
                <span className="text-center text-green-900">
                  {overtime.quandoc}
                  {!overtime.quandoc &&
                    user?.bophan === overtime.bophan.slice(0, 3) + "quandoc" && (
                      <Button
                        variant="link"
                        className="underline text-red-500"
                        onClick={() => handleSignature(overtime.id, "quandoc")}
                      >
                        Ký đơn
                      </Button>
                    )}
                </span>
              </div>

              <div className="flex flex-col items-center col-span-2 lg:col-span-1 gap-2">
                <span className="uppercase font-bold text-blue-600 text-xl">Ban giám đốc</span>
                <span className="text-center text-green-900">
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
                          onClick={() => handleCancel(overtime.id)}
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
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OvertimeCreate;
