import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { apiKCSReport, apiKCSUpdateFailed, apiKCSUpdatePassed } from "~/apis/kcs.api";
import Loading from "~/components/Loading";
import { QUERY_KEY } from "~/lib/queryKey";
import { linesList } from "~/lib/variables";
import type { KcType } from "~/types/kcs.type";
import type { PlanType } from "~/types/plan.type";
import type { Route } from "./+types/report";
export async function loader({ params: { id } }: Route.LoaderArgs) {
  return id;
}

export function meta() {
  return [
    { title: "Báo cáo KCS hàng ngày" },
    { name: "description", content: "Báo cáo KCS hàng ngày" },
  ];
}
function KCSReportPage({ loaderData: id }: Route.ComponentProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<
    KcType & {
      plan: PlanType;
      kcsErrors: string[];
    }
  >({
    queryKey: [QUERY_KEY.kcs.FIND_REPORT, id],
    queryFn: async () => apiKCSReport(id),
    enabled: !!id,
    retry: false,
  });

  const mutationUpdatePassed = useMutation({
    mutationFn: (id: number) => apiKCSUpdatePassed(id.toString()),
    onSuccess: () => {
      toast.success("+1 sản phẩm đạt");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.kcs.FIND_REPORT, id] });
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/kcs");
    },
  });
  const mutationUpdateFailed = useMutation({
    mutationFn: ({ id, maloi }: { id: number; maloi: string }) =>
      apiKCSUpdateFailed(id.toString(), maloi),
    onSuccess: () => {
      toast.error("+1 sản phẩm lỗi");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.kcs.FIND_REPORT, id] });
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/kcs");
    },
  });
  useEffect(() => {
    if (isError) {
      toast.error("Đã quá thời gian truy cập");
      navigate("/kcs");
    }
  }, [isError]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="flex flex-col bg-black h-screen w-screen text-white">
      {data && (
        <div className="flex-1 flex flex-col mx-auto w-full md:w-2/3 uppercase">
          <div className="flex justify-between items-center">
            <div className="flex items-center uppercase gap-2">
              <span className="text-6xl md:text-7xl flex justify-center bg-red-500 font-bold p-3 min-w-24">
                {data.slloi}
              </span>
              <span className="text-white text-3xl font-extrabold hidden lg:block">DEFECT</span>
            </div>
            <span className="text-3xl md:text-5xl font-black">
              {linesList.find((line) => line.value === data.plan.chuyen)?.name}
            </span>
            <div className="flex uppercase items-center gap-2">
              <span className="text-white text-3xl font-extrabold hidden lg:block">PASS</span>
              <button
                onClick={() => mutationUpdatePassed.mutate(data.id)}
                className="text-6xl md:text-7xl flex justify-center bg-green-500 font-bold p-3 min-w-24"
              >
                {data.sldat}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 text-xl font-bold text-center my-1 py-1 border-2">
            <div className="flex flex-col border-r">
              <span className="line-clamp-1">{data.plan.khachhang}</span>
              <span className="line-clamp-1">#{data.plan.mahang}</span>
            </div>
            <div className="flex flex-col border-r">
              <span>chỉ tiêu</span>
              <span>{data.chitieungay}</span>
            </div>

            <div className="flex flex-col border-r">
              <span>Tỷ lệ lỗi</span>
              {data.sldat == 0 && data.slloi == 0 && <span>0%</span>}
              {(data.sldat != 0 || data.slloi != 0) && (
                <span>{((data.slloi / (data.sldat + data.slloi)) * 100).toFixed(1)}%</span>
              )}
            </div>
            <div className="flex items-center justify-center">
              {/* <div className="inline-flex items-center justify-center rounded cursor-pointer w-[140px] bg-red-500 p-1"> */}
              <Link
                to={"/tao-don"}
                className="font-medium rounded text-base underline text-center uppercase bg-gradient-to-br from-[#e3ffe7] via-[#87CEFA] to-[#d9e7ff] text-black px-2 py-1"
              >
                tạo đơn
              </Link>
              {/* </div> */}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-5 gap-y-1 gap-x-2">
            {["A", "B", "C", "D", "E", "G", "H", "I", "K", "L", "M"].map((letter) =>
              [1, 2, 3, 4, 5].map((num) => (
                <button
                  onClick={() =>
                    data.kcsErrors.includes(letter + num) &&
                    mutationUpdateFailed.mutate({ id: data.id, maloi: letter + num })
                  }
                  disabled={!data.kcsErrors.includes(letter + num)}
                  key={letter + num}
                  className={`${data.kcsErrors.includes(letter + num) ? "bg-blue-600" : "bg-gray-500 !cursor-not-allowed"} font-bold text-2xl rounded`}
                >
                  {letter + num}
                </button>
              ))
            )}
          </div>
          <div className="text-sm text-center py-1 font-semibold">
            <span>Hỗ trợ:</span>
            <Link className="underline ml-2" to={`https://zalo.me/0962324571`}>
              096.2324.571
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default KCSReportPage;
