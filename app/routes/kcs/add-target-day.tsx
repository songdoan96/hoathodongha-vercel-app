import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router";
import { z } from "zod";
import { apiPlanDoing } from "~/apis/plan.api";
import AddTargetRowComponent from "~/components/Kcs/AddTargetRow";
import Loading from "~/components/Loading";
import { QUERY_KEY } from "~/lib/queryKey";
import type { PlanType } from "~/types/plan.type";

export function meta() {
  return [
    { title: "Kế hoạch thêm chỉ tiêu ngày" },
    { name: "description", content: "Kế hoạch thêm chỉ tiêu ngày" },
  ];
}

function KcsAddTargetDayPage() {
  const { data, isLoading } = useQuery<PlanType[]>({
    queryKey: [QUERY_KEY.plan.DOING],
    queryFn: apiPlanDoing,
  });

  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="min-h-screen flex flex-col flex-wrap bg-gray-200">
      <div id="header" className="flex items-center px-2 py-1 bg-blue-500 text-white">
        <Link to="/kcs">
          <img className="w-10" src="/images/logo.png" alt="Logo" />
        </Link>
        <div className="flex flex-1 justify-between items-center">
          <div className="text-2xl uppercase font-bold text-center w-full">
            <span>Kế hoạch thêm chỉ tiêu ngày</span>
            <span className="font-bold text-black bg-white px-1 ml-2">
              {format(new Date(), "dd/MM/yyyy")}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex-1 flex flex-col justify-center">
        <div className="relative overflow-x-auto mt-2 mx-auto w-2/3 ">
          <table className="text-base text-center text-black border bg-white w-full">
            <thead className=" font-bold uppercase bg-blue-500 text-white">
              <tr>
                <th className="border border-black p-2">Chuyền</th>
                <th className="border border-black p-2">Khách hàng</th>
                <th className="border border-black p-2">Mã hàng</th>
                <th className="border border-black p-2">Tác nghiệp</th>
                <th className="border border-black p-2">thực hiện</th>
                <th className="border border-black p-2">nhập hoàn thành</th>
                <th className="border border-black p-2">Chỉ tiêu ngày</th>
                {/* <th className="border border-black p-2"></th> */}
              </tr>
            </thead>
            <tbody>
              {data?.map((plan) => (
                <AddTargetRowComponent key={plan.id} plan={plan} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default KcsAddTargetDayPage;
