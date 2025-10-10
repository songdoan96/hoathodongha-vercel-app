import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router";
import { apiProduceDashboard } from "~/apis/produce.api";
import Loading from "~/components/Loading";
import { QUERY_KEY } from "~/lib/queryKey";
import type { PlanType } from "~/types/plan.type";

export function meta() {
  return [
    { title: "THEO DÕI THÔNG TIN SẢN XUẤT" },
    { name: "description", content: "THEO DÕI THÔNG TIN SẢN XUẤT" },
  ];
}

function ProduceDashboardPage() {
  const { data, isLoading } = useQuery<PlanType[]>({
    queryKey: [QUERY_KEY.produce.DASHBOARD],
    queryFn: apiProduceDashboard,
    refetchInterval: 1000 * 60 * 3,
  });
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <div id="header" className="flex items-center px-2 py-1 bg-blue-500 text-white">
        <Link to={"/"} title="Trang chủ">
          <img src="/images/logo.png" className="w-10" alt="Logo" />
        </Link>
        <div className="flex items-center gap-4 flex-1 justify-center">
          <h1 className="text-center text-2xl uppercase font-bold">THEO DÕI THÔNG TIN SẢN XUẤT</h1>
          <Link to={"/kcs"} title="Báo cáo cuối ngày">
            <img src="/images/report.gif" alt="Báo cáo cuối ngày" width={40} />
          </Link>
          <a
            href="http://172.17.0.30:8000/kehoach"
            title="Đơn hàng tiếp theo"
            className="rounded-full overflow-hidden"
          >
            <img src="/images/next.gif" alt="Báo cáo cuối ngày" width={40} />
          </a>
          <a href="http://172.17.0.30:8000/sanxuat/ket-thuc" title="Đơn hàng đã xuất">
            <img src="/images/history.png" alt="Báo cáo cuối ngày" width={40} />
          </a>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.map((plan) => {
            if (plan.daraichuyen) {
              const ptThucHien = (plan.thuchien / plan.sltacnghiep) * 100;
              return (
                <Link
                  key={plan.id}
                  to={`/sanxuat/tv/${plan.chuyen}`}
                  className="bg-white border border-black font-semibold text-gray-100 text-lg flex flex-col gap-1 overflow-hidden hover:scale-105 transition rounded"
                >
                  <div className="flex gap-1 text-xl font-bold">
                    <div className="w-1/3 bg-blue-600 flex items-center justify-center">
                      <p className="text-3xl">{plan.chuyen}</p>
                    </div>
                    <div className="flex-1 bg-blue-600 flex flex-col items-center">
                      <p className="line-clamp-1">{plan.khachhang}</p>
                      <p className="line-clamp-1">{plan.mahang}</p>
                    </div>
                  </div>
                  <div className="bg-blue-600 p-2 flex flex-col">
                    <div className="flex justify-between">
                      <span>Tác nghiệp</span>
                      <span>{plan.sltacnghiep}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LK thực hiện</span>
                      <span className="flex items-center gap-1 z-50">
                        <span>{plan.thuchien}</span>
                        {ptThucHien > 95 && <img src="/images/alert.gif" width={20} alt="" />}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-1 mt-2">
                      <span className="bg-gray-100 h-3 w-full relative overflow-hidden">
                        <span
                          className={`absolute h-full left-0 bg-[#7cd79f]`}
                          style={{ width: `${Number(ptThucHien.toFixed(1))}%` }}
                        />
                        <span className="text-blue-900 absolute w-full h-full text-xs font-bold flex justify-center items-center">
                          {ptThucHien.toFixed(1)} %
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SL còn lại</span>
                      <span>{plan.sltacnghiep - plan.thuchien}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nhập hoàn thành</span>
                      <span>{plan.nhaphoanthanh}</span>
                    </div>
                  </div>
                  <div className="bg-blue-600 p-2">
                    <div className="flex justify-between">
                      <span>Chỉ tiêu ngày</span>
                      <span>{plan.kcs?.length ? plan.kcs[0].chitieungay : "--"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SP đạt / TL đạt</span>
                      {!plan.kcs && <span>--</span>}
                      {plan.kcs && plan.kcs.length && plan.kcs[0].chitieungay ? (
                        <span className="flex gap-1">
                          <span>{plan.kcs[0].sldat}pcs</span>
                          <span>/</span>
                          <span>
                            {((plan.kcs[0].sldat / plan.kcs[0].chitieungay) * 100).toFixed(1)}%
                          </span>
                        </span>
                      ) : (
                        <span>--</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span>SP lỗi / TL lỗi</span>
                      {!plan.kcs && <span>--</span>}
                      {plan.kcs &&
                      plan.kcs.length &&
                      plan.kcs[0].chitieungay &&
                      (plan.kcs[0].sldat != 0 || plan.kcs[0].slloi != 0) ? (
                        <span className="flex gap-1">
                          <span>{plan.kcs[0].slloi}pcs</span>
                          <span>/</span>
                          <span>
                            {(
                              (plan.kcs[0].slloi / (plan.kcs[0].sldat + plan.kcs[0].slloi)) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </span>
                      ) : (
                        <span>--</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            }
          })}

          <div className="bg-gray-300 p-2 font-bold border border-black text-black flex flex-col gap-1 overflow-hidden transition">
            <h2 className="text-center uppercase text-lg text-blue-600">Đơn hàng chờ sản xuất</h2>
            {data &&
              data.map((plan) => {
                if (!plan.daraichuyen) {
                  return (
                    <p key={plan.id}>
                      - Tổ {plan.chuyen}: #{plan.mahang} ({format(plan.ngaydukien, "dd-MM")})
                    </p>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProduceDashboardPage;
