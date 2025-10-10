import { format } from "date-fns";
import type { AuthStoreType } from "~/stores/auth-store";
import type { OvertimeType } from "~/types/overtime";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiOvertimeCreate, apiOvertimeLineDelete } from "~/apis/overtime.api";
import { QUERY_KEY } from "~/lib/queryKey";
import { toast } from "sonner";

function OvertimeList({ overtimes, user }: { overtimes: OvertimeType[]; user: AuthStoreType }) {
  console.log("🚀 ~ OvertimeList ~ overtimes:", overtimes);
  // const { data, isLoading } = useQuery({
  //   queryKey: [QUERY_KEY.overtime.FIND_LIST_IN_LINE, user.bophan],
  //   queryFn: () => apiOvertimeFindListInLine(user.bophan),
  //   enabled: !!user.bophan,
  // });
  // if (isLoading) {
  //   return <Loading fullScreen />;
  // }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => apiOvertimeLineDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.overtime.FIND_LIST_IN_LINE] });
      toast.success("Đã xóa đơn.");
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
    },
  });
  return (
    <div className="w-full">
      <table className="text-left w-full">
        <thead>
          <tr>
            <th className="border p-1 px-2 bg-teal-300"></th>
            <th className="border p-1 px-2 bg-teal-300">Ngày tạo</th>
            <th className="border p-1 px-2 bg-teal-300">Tăng ca ngày</th>
            <th className="border p-1 px-2 bg-teal-300">Thời gian</th>
            <th className="border p-1 px-2 bg-teal-300">Lý do</th>
            <th className="border p-1 px-2 bg-teal-300">Danh sách</th>
            <th className="border p-1 px-2 bg-teal-300">Trạng thái</th>
            <th className="border p-1 px-2 bg-teal-300">Ký nhận</th>
          </tr>
        </thead>
        <tbody>
          {overtimes?.map((overtime, index) => (
            <tr key={overtime.id}>
              <td className="border p-1 px-2">
                <button
                  onClick={() => mutation.mutate(overtime.id.toString())}
                  className="flex justify-center items-center"
                >
                  {overtime.trangthai === "pending" && <Trash2Icon color="red" size={20} />}
                </button>
              </td>
              <td className="border p-1 px-2"> {format(overtime.created_at, "dd/MM/yyyy")}</td>
              <td className="border p-1 px-2">{overtime.ngay}</td>
              <td className="border p-1 px-2"> {overtime.thoigian}</td>
              <td className="border p-1 px-2">{overtime.lydo}</td>
              <td className="border p-1 px-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    {/* <Link to={lineRouter.overtime.xemdon(overtime.id.toString())}> */}
                    <Link to={""}>{JSON.parse(overtime.danhsach).length} người</Link>
                    {/* </Link> */}
                  </HoverCardTrigger>
                  <HoverCardContent
                    align="center"
                    className="w-full shadow-lg border border-blue-500"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                      {overtime?.employees?.map((e, index) => (
                        <p className="text-sm border-b" key={index}>
                          {++index}. {e.hoten}
                        </p>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </td>
              <td className="border p-1 px-2">
                <Link to={""}>
                  {overtime.trangthai === "pending" ? (
                    <Badge variant="default">Chờ xử lý</Badge>
                  ) : overtime.trangthai === "accept" ? (
                    <Badge variant="success" className="bg-green-600">
                      Đã duyệt
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Đã Hủy</Badge>
                  )}
                </Link>
              </td>
              <td className="border p-1 px-2">{overtime.kynhan ?? "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OvertimeList;
