import { useQuery } from "@tanstack/react-query";
import type { Route } from "./+types/view";
import type { OvertimeType } from "~/types/overtime";
import { QUERY_KEY } from "~/lib/queryKey";
import { apiAuthFindAll } from "~/apis/auth.api";
import { apiOvertimeFindOne } from "~/apis/overtime.api";
import Loading from "~/components/Loading";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import { Calendar1, CircleAlert, ClipboardType, Clock9, UsersRound } from "lucide-react";
import { linesList } from "~/lib/variables";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Chi tiết danh sách" }, { name: "description", content: "Chi tiết danh sách" }];
}
export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}
export interface DataType extends OvertimeType {
  employees: { hoten: string; msnv: string }[];
}
export default function OvertimeView({ loaderData }: Route.ComponentProps) {
  const { data, isPending, isLoading } = useQuery<DataType>({
    queryKey: [QUERY_KEY.overtime.FIND_ONE, loaderData],
    queryFn: () => apiOvertimeFindOne(loaderData),
    enabled: !!loaderData,
  });
  console.log("🚀 ~ OvertimeView ~ data:", data);
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="min-h-screen bg-[#F2F7FA]">
      <HeaderComponent>
        <HeaderTitle>Phiếu đăng ký làm thêm giờ</HeaderTitle>
      </HeaderComponent>
      {data && (
        <div className="flex flex-col w-full lg:w-1/2 mx-auto border px-4">
          <h3 className="text-center font-bold text-2xl my-3 uppercase text-blue-700">
            Danh sách lao động đăng ký tự nguyện làm thêm giờ
          </h3>
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="flex flex-col gap-1 bg-white p-2">
              <p className="font-bold flex items-center gap-2">
                <CircleAlert color="green" />
                Bộ phận
              </p>
              <p className="text-gray-500">
                {linesList.find((line) => line.value === data.bophan)?.name}
              </p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-2">
              <p className="font-bold flex items-center gap-2">
                <Calendar1 color="green" />
                Ngày
              </p>
              <p className="text-gray-500">{data.ngay}</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-2">
              <p className="font-bold flex items-center gap-2">
                <Clock9 color="green" /> Giờ đăng ký
              </p>
              <p className="text-gray-500">{data.thoigian}</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-2">
              <p className="font-bold flex items-center gap-2">
                <UsersRound />
                Số lượng
              </p>
              <p className="text-gray-500">{data.employees?.length} người</p>
            </div>
            <div className="flex flex-col gap-1 bg-white p-2 col-span-4">
              <p className="font-bold flex items-center gap-2">
                <ClipboardType />
                Lý do
              </p>
              <p className="text-gray-500">{data.lydo}</p>
            </div>
          </div>
          <table className="text-left">
            <thead>
              <tr>
                <th className="border p-1 px-2 bg-sky-300">STT</th>
                <th className="border p-1 px-2 bg-sky-300">MSNV</th>
                <th className="border p-1 px-2 bg-sky-300">Họ tên</th>
              </tr>
            </thead>
            <tbody>
              {data.employees.map((employee, index) => (
                <tr key={index}>
                  <td className="border p-1 px-2">{++index}</td>
                  <td className="border p-1 px-2">{employee.msnv}</td>
                  <td className="border p-1 px-2">{employee.hoten}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
