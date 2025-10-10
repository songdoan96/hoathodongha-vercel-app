import { useSearchParams } from "react-router";
import CuttingTableHeaderComponent from "~/components/Cutting/Table/Header";
import type { Route } from "./+types";
import type { EmployeeType } from "~/types/employee";
import { useQuery } from "@tanstack/react-query";
import type { CuttingTableType } from "~/types/cutting";
import { QUERY_KEY } from "~/lib/queryKey";
import { apiCuttingTableGetByCustomerOrStyle } from "~/apis/cutting.api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chi tiết báo cáo bàn cắt" },
    { name: "description", content: "Chi tiết báo cáo bàn cắt" },
  ];
}

function CuttingTableDashboardDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(
    "🚀 ~ CuttingTableDashboardDetail ~ searchParams:",
    searchParams.has("khachhang") || searchParams.get("khachhang"),
    searchParams.has("mahang") || searchParams.get("mahang")
  );

  const { data, isLoading } = useQuery<CuttingTableType[]>({
    queryKey: [QUERY_KEY.cutting.TABLE_CUSTOMER_STYLE_DETAIL],
    queryFn: () =>
      apiCuttingTableGetByCustomerOrStyle({
        customer: searchParams.get("khachhang") || "",
        style: searchParams.get("mahang") || "",
      }),
  });
  console.log(`🚀 ~ CuttingTableDashboardDetail ~ { data, isLoading }:`, { data, isLoading });
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CuttingTableHeaderComponent />
      <div className="relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right text-black dark:text-gray-400 shadow-2xl">
          <thead className="text-white uppercase bg-blue-500">
            <tr>
              <th className="p-1 border border-black text-center">Khách hàng</th>
              <th className="p-1 border border-black text-center">Mã hàng</th>
              <th className="p-1 border border-black text-center">Loại vải</th>
              <th className="p-1 border border-black text-center">Item</th>
              <th className="p-1 border border-black text-center">Đợt</th>
              <th className="p-1 border border-black text-center">Màu</th>
              <th className="p-1 border border-black text-center">Size</th>
              <th className="p-1 border border-black text-center">Đơn vị</th>
              <th className="p-1 border border-black text-center">Áo/Quần</th>
              <th className="p-1 border border-black text-center">Định mức</th>
              <th className="p-1 border border-black text-center">SL kế hoạch</th>
              <th className="p-1 border border-black text-center">Đã cắt</th>
              <th className="p-1 border border-black text-center">SL chưa cắt</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cutting, index) => (
              <tr key={cutting.id} data-id={cutting.id}>
                <td className="p-1 border border-black">{cutting.customer}</td>
                <td className="p-1 border border-black">{cutting.style}</td>
                <td className="p-1 border border-black">{cutting.type}</td>
                <td className="p-1 border border-black">{cutting.itemCode}</td>
                <td className="p-1 border border-black">{cutting.batch}</td>
                <td className="p-1 border border-black">{cutting.color}</td>
                <td className="p-1 border border-black">
                  {cutting.sizes.map((item) => `${item.size}/${item.qty}`).join(",  ")}
                </td>
                <td className="p-1 border border-black">{cutting.isMeter ? "MET" : "YD"}</td>
                <td className="p-1 border border-black">{cutting.isShirt ? "Áo" : "Quần"}</td>
                <td className="p-1 border border-black">{cutting.rate}</td>
                <td className="p-1 border border-black">
                  {cutting.sizes.reduce((sum, item) => sum + item.qty, 0)}
                </td>
                <td className="p-1 border border-black">{cutting.customer}</td>
                <td className="p-1 border border-black">{cutting.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CuttingTableDashboardDetail;
