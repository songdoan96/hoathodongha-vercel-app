import { format } from "date-fns";
import { ClipboardPlus, Signature, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { useOvertimesFindAll, useOvertimesUpdate } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
export function meta() {
  return [{ title: "Danh sách đăng ký tăng ca" }];
}
function OvertimeDashboard() {
  const { data, isLoading } = useOvertimesFindAll();
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
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      <HeaderComponent>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách đăng ký tăng ca
        </span>
      </HeaderComponent>
      <div className="text-blue-600 my-4 flex justify-center items-center">
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
          )}
      </div>

      <div className="w-full h-full flex-1">
        {isLoading ? (
          <Loading fullScreen />
        ) : (
          <div className="overflow-x-auto w-full h-full flex-1">
            <table className="w-full h-full divide-y divide-gray-200  shadow-2xl">
              <thead className="rounded-2xl">
                <tr className="bg-[#37b159] text-white uppercase">
                  <th className="text-center border p-2 whitespace-nowrap">Ngày tạo</th>
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
                    className={`${!overtime.status ? "bg-red-50 line-through text-red-500" : "bg-green-50 hover:bg-green-100"}`}
                  >
                    <td className="text-center border p-2 whitespace-nowrap">
                      {format(overtime.createdAt, "dd/MM")}
                    </td>
                    <td className="text-center border p-2 whitespace-nowrap underline text-blue-600 font-bold">
                      <Link to={routers().overtime.detail(overtime.id)}>
                        {linesList.find((line) => line.value === overtime.bophan)?.name}
                      </Link>
                    </td>
                    <td className="text-center border p-2 whitespace-nowrap">{overtime.ngay}</td>
                    <td className="text-center border p-2 whitespace-nowrap">{overtime.gio}</td>
                    <td className="text-center border p-2 whitespace-nowrap">{overtime.lydo}</td>
                    <td className="text-center border p-2 whitespace-nowrap">
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
                    <td className="text-center border p-2 whitespace-nowrap">
                      {overtime.totruong}
                    </td>
                    <td className="text-center border p-2 whitespace-nowrap">
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
                    </td>
                    <td className="text-center border p-2 whitespace-nowrap w-40">
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

export default OvertimeDashboard;
