import { Link } from "react-router";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { useOvertimesFindOne, useOvertimesUpdate } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";
import type { Route } from "./+types/detail";
import { CalendarDays, Clock3, Hash, MessageCircleQuestionMark } from "lucide-react";

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
          <div className="lg:max-w-5xl mx-auto border p-1 lg:p-4 py-8 shadow-2xl rounded-xl bg-white">
            <div className="grid grid-cols-2 gap-2 gap-y-4 w-full">
              <div className="flex gap-2 items-center">
                <Hash color="green" />
                <span className="font-semibold text-blue-600 uppercase">Bộ phận:</span>
                <span>{overtime?.bophan}</span>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarDays color="green" />
                <span className="font-semibold text-blue-600 uppercase">Ngày:</span>
                <span>{overtime?.ngay}</span>
              </div>
              <div className="flex gap-2 items-center">
                <Clock3 color="green" />
                <span className="font-semibold text-blue-600 uppercase">Giờ:</span>
                <span>{overtime?.gio}</span>
              </div>
              <div className="flex gap-2 items-center">
                <MessageCircleQuestionMark color="green" />
                <span className="font-semibold text-blue-600 uppercase">Lý do:</span>
                <span>{overtime?.lydo}</span>
              </div>
            </div>
            <table className="table w-full my-8 bg-white">
              <thead>
                <tr className="bg-[#37b159] text-white uppercase">
                  <th className="text-center border p-1">STT</th>
                  <th className="text-center border p-1">Họ tên</th>
                  <th className="text-center border p-1">MSNV</th>
                </tr>
              </thead>
              <tbody>
                {overtime?.danhsach.map((emp, index) => (
                  <tr key={index} className="bg-green-50 text-green-900 uppercase font-semibold">
                    <td className="text-center border p-1">{index + 1}</td>
                    <td className="text-center border p-1">{emp.hoten}</td>
                    <td className="text-center border p-1">{emp.msnv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <span className="uppercase font-bold text-blue-600">Lãnh đạo</span>
                <span className="text-center text-green-900">
                  {overtime.lanhdao}
                  {!overtime.lanhdao &&
                    (user?.bophan?.includes("lanhdao") || user?.bophan?.includes("giamdoc")) && (
                      <Button
                        variant="link"
                        className="underline text-red-500"
                        onClick={() => handleSignature(overtime.id, "lanhdao")}
                      >
                        Ký đơn
                      </Button>
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
