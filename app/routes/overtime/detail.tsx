import { Link } from "react-router";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { useOvertimesFindOne, useOvertimesUpdate } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";
import type { Route } from "./+types/detail";
import {
  Ban,
  CalendarDays,
  Clock3,
  Hash,
  MessageCircleQuestionMark,
  Signature,
  Trash2,
} from "lucide-react";
import { linesList } from "~/lib/variables";

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 w-full">
              <div className="flex gap-2 items-center">
                <Hash color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Bộ phận</span>
                <span>: {linesList.find((line) => line.value === overtime.bophan)?.name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarDays color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Ngày</span>
                <span>: {overtime?.ngay}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Clock3 color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Giờ</span>
                <span>: {overtime?.gio}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircleQuestionMark color="green" />
                <span className="font-semibold text-blue-600 uppercase w-20">Lý do</span>
                <span>: {overtime?.lydo}</span>
              </div>
            </div>

            {overtime.status ? (
              <>
                <h1 className="uppercase text-center my-2 font-semibold border-y py-2 shadow text-blue-900">
                  Danh sách lao động đăng ký tự nguyện làm thêm giờ
                </h1>
                <table className="table w-full bg-white">
                  <thead>
                    <tr className="bg-[#37b159] text-white uppercase">
                      <th className="text-center border p-1">STT</th>
                      <th className="text-center border p-1">Họ tên</th>
                      <th className="text-center border p-1">MSNV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overtime?.danhsach.map((emp, index) => (
                      <tr
                        key={index}
                        className="bg-green-50 text-green-900 uppercase font-semibold"
                      >
                        <td className="text-center border p-1">{index + 1}</td>
                        <td className="text-center border p-1">{emp.hoten}</td>
                        <td className="text-center border p-1">{emp.msnv}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="flex justify-center items-center gap-4 uppercase font-semibold text-3xl my-4 py-8 text-red-600 bg-red-50">
                <Ban />
                <h1>Đơn tăng ca không có hiệu lực</h1>
              </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 mt-10">
              <div className="flex flex-col items-center gap-4">
                <span className="uppercase font-bold text-blue-600">Tổ trưởng</span>
                <span className="text-center text-green-900">{overtime?.totruong}</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="uppercase font-bold text-blue-600">Quản đốc</span>
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
              <div className="flex flex-col items-center col-span-2 lg:col-span-1 gap-4">
                <span className="uppercase font-bold text-blue-600">Ban giám đốc</span>
                <span className="text-center text-green-900">
                  {overtime.lanhdao}
                  {overtime.status &&
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
