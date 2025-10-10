import { useQuery } from "@tanstack/react-query";
import { apiCuttingTableGetDoingGroupByCustomer } from "~/apis/cutting.api";
import CuttingTableHeaderComponent from "~/components/Cutting/Table/Header";
import Loading from "~/components/Loading";
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Báo cáo bàn cắt" }, { name: "description", content: "Báo cáo bàn cắt" }];
}

interface CuttingTableDataType {
  styles: string[];
  customer: string;
}
function CuttingTableDashboardPage() {
  const { data, isLoading } = useQuery<CuttingTableDataType[]>({
    queryKey: [QUERY_KEY.cutting.TABLE_DASHBOARD],
    queryFn: apiCuttingTableGetDoingGroupByCustomer,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CuttingTableHeaderComponent />
      <div className="relative overflow-x-auto bg-gray-200 flex-1">
        <div className="relative p-2">
          {isLoading ? (
            <Loading fullScreen />
          ) : (
            <div className="grid grid-cols-6 gap-8">
              {data &&
                data.map((cuttingTable) => (
                  <div
                    key={cuttingTable.customer}
                    className="rounded shadow bg-white overflow-hidden self-start"
                  >
                    <div className="text-white flex items-center bg-[#49A6D4]">
                      <div className="flex-1 font-bold uppercase text-xl text-center block">
                        <a
                          title="Chi tiết khách hàng"
                          href={
                            routers.cutting.table.detail() + `?khachhang=` + cuttingTable.customer
                          }
                          className="font-bold uppercase text-xl w-full justify-center flex items-center gap-2 underline underline-offset-1"
                        >
                          <span>{cuttingTable.customer}</span>
                          <img className="w-4" src="/images/next.gif" alt="" />
                        </a>
                      </div>
                    </div>
                    <ul className="flex flex-col">
                      {cuttingTable.styles.map((style) => (
                        <li
                          key={style}
                          className="border-b flex items-center py-1 gap-2 border-l-2 hover:border-l-green-500 hover:bg-gray-50"
                        >
                          <svg
                            className="w-3.5 h-3.5 ms-2 text-blue-500 dark:text-gray-400 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"></path>
                          </svg>
                          <a
                            title="Chi tiết #ASPEN"
                            className="font-semibold line-clamp-1 px-2 inline-block w-full"
                            href={routers.cutting.table.detail() + `?mahang=` + style}
                          >
                            <span className="line-clamp-1">{style}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CuttingTableDashboardPage;
