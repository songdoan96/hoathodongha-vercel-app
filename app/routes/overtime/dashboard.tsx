import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { apiOvertimeFindAll } from "~/apis/overtime.api";
import { HeaderComponent, HeaderRight, HeaderTitle } from "~/components/Header";
import { Badge } from "~/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import { linesList } from "~/lib/variables";
import type { OvertimeType } from "~/types/overtime";
import type { Route } from "./+types/dashboard";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Danh sách tăng ca" }, { name: "description", content: "Danh sách tăng ca" }];
}

export interface DataType extends OvertimeType {
  employees: { hoten: string }[];
}

function OvertimeDashboard() {
  const { data, isLoading } = useQuery<DataType[]>({
    queryKey: [QUERY_KEY.overtime.FIND_ALL],
    queryFn: apiOvertimeFindAll,
  });
  console.log("🚀 ~ OvertimeDashboard ~ data:", data);
  return (
    <div>
      <HeaderComponent>
        <HeaderTitle>Danh sách đăng ký tăng ca</HeaderTitle>
        <HeaderRight>
          {/* <Link to={formRouter.kynhan} className="underline text-white font-bold">
            <ClipboardPen />
          </Link> */}
          {/* <MenubarComponent /> */}
          right
        </HeaderRight>
      </HeaderComponent>
      {/* <LineNavbar /> */}
      <div className="flex flex-wrap gap-4 p-2">
        <div className="overflow-auto flex-1">
          <table className="text-left">
            <thead>
              <tr>
                <th className="border p-1 px-2 bg-sky-300">STT</th>
                <th className="border p-1 px-2 bg-sky-300">Ngày</th>
                <th className="border p-1 px-2 bg-sky-300">Tổ</th>
                <th className="border p-1 px-2 bg-sky-300">Thời gian</th>
                <th className="border p-1 px-2 bg-sky-300">Tổ trưởng</th>
                <th className="border p-1 px-2 bg-sky-300">Số người đăng ký</th>
                <th className="border p-1 px-2 bg-sky-300">Lý do</th>
                <th className="border p-1 px-2 bg-sky-300">Trạng thái</th>
                <th className="border p-1 px-2 bg-sky-300">Ký nhận</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((overtime, index) => (
                <tr key={overtime.id}>
                  <td className="border p-1 px-2">{++index}</td>
                  <td className="border p-1 px-2">{overtime.ngay}</td>
                  <td className="border p-1 px-2">
                    {linesList.find((line) => line.value === overtime.bophan)?.name}
                  </td>
                  <td className="border p-1 px-2"> {overtime.thoigian}</td>
                  <td className="border p-1 px-2">{overtime.totruong}</td>
                  <td className="border p-1 px-2">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link className="underline" to={""}>
                          {JSON.parse(overtime.danhsach).length} người
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent
                        align="center"
                        className="w-full shadow-lg border border-blue-500"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                          {overtime.employees.map((user, index) => (
                            <p className="text-sm border-b" key={index}>
                              {++index}. {user.hoten}
                            </p>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                  <td className="border p-1 px-2">{overtime.lydo}</td>
                  <td className="border p-1 px-2">
                    <Link className="underline" to={routers.overtime.view(overtime.id)}>
                      {overtime.trangthai === "pending" ? (
                        <Badge variant="default">Chờ xử lý</Badge>
                      ) : overtime.trangthai === "accept" ? (
                        <Badge className="mx-auto" variant="success">
                          Đã duyệt
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Đã Hủy</Badge>
                      )}
                    </Link>
                  </td>
                  <td className="border p-1 px-2">{overtime.kynhan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OvertimeDashboard;
