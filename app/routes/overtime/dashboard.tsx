import { ClipboardPlus } from "lucide-react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { useOvertimesFindAll, useOvertimesUpdate } from "~/hooks/overtimes-hook";
import routers from "~/lib/routers";
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
  return (
    <div className="w-full h-full min-h-screen bg-gray-100">
      <HeaderComponent>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách đăng ký tăng ca
        </span>
      </HeaderComponent>
      <div className="text-blue-600 my-2 flex justify-center items-center">
        {user &&
          user?.bophan !== "lanhdao" &&
          user?.bophan !== "giamdoc" &&
          !user?.bophan?.includes("quandoc") && (
            <Link
              to={routers().overtime.create}
              className="uppercase underline font-semibold flex items-center gap-1"
            >
              <ClipboardPlus />
              <span>Tạo đơn</span>
            </Link>
          )}
      </div>

      <div className="p-2 w-full">
        {isLoading ? (
          <Loading fullScreen />
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="rounded-2xl">
                <tr className="bg-[#37b159] text-white uppercase">
                  {/* <th className="text-center border p-2 whitespace-nowrap">Ngày</th> */}
                  <th className="text-center border p-2 whitespace-nowrap">Bộ phận</th>
                  <th className="text-center border p-2 whitespace-nowrap">Ngày đăng ký</th>
                  <th className="text-center border p-2 whitespace-nowrap">Giờ đăng ký</th>
                  <th className="text-center border p-2 whitespace-nowrap">Lý do</th>
                  <th className="text-center border p-2 whitespace-nowrap">Số lượng</th>
                  <th className="text-center border p-2 whitespace-nowrap">Tổ trưởng</th>
                  <th className="text-center border p-2 whitespace-nowrap">Quản đốc</th>
                  <th className="text-center border p-2 whitespace-nowrap">Lãnh đạo</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((overtime) => (
                  <tr key={overtime.id}>
                    {/* <td className="text-center border p-2 whitespace-nowrap">
                      {format(overtime.createdAt, "dd/MM")}
                    </td> */}
                    <td className="text-center border p-2 whitespace-nowrap underline text-blue-600 font-bold">
                      <Link to={routers().overtime.detail(overtime.id)}>{overtime.bophan}</Link>
                    </td>
                    <td className="text-center border p-2 whitespace-nowrap">{overtime.ngay}</td>
                    <td className="text-center border p-2 whitespace-nowrap">{overtime.gio}</td>
                    <td className="text-center border p-2 whitespace-nowrap">{overtime.lydo}</td>
                    <td className="text-center border p-2 whitespace-nowrap">
                      <Link
                        to={routers().overtime.detail(overtime.id)}
                        className="underline text-blue-600 font-bold"
                      >
                        {overtime.danhsach.length} người
                      </Link>
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
                    <td className="text-center border p-2 whitespace-nowrap">
                      {overtime.lanhdao}
                      {!overtime.lanhdao &&
                        (user?.bophan?.includes("lanhdao") ||
                          user?.bophan?.includes("giamdoc")) && (
                          <Button
                            variant="link"
                            className="underline text-red-500"
                            onClick={() => handleSignature(overtime.id, "lanhdao")}
                          >
                            Ký đơn
                          </Button>
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
