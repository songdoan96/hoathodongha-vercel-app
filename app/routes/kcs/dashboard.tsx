import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router";
import { apiKCSDashboard } from "~/apis/kcs.api";
import Loading from "~/components/Loading";
import ENV_CONFIG from "~/lib/env";
import { calculatorRemaining } from "~/lib/helpers";
import { QUERY_KEY } from "~/lib/queryKey";
import { calculatorAchieveRate, calculatorDefectRate } from "~/lib/utils";
import type { KcType } from "~/types/kcs.type";

export function meta() {
  return [
    { title: "Báo cáo KCS hàng ngày" },
    { name: "description", content: "Báo cáo KCS hàng ngày" },
  ];
}

function KCSDashboardPage() {
  const [currentDate, setCurrentDay] = useState(format(new Date(), "yyyy-MM-dd"));
  const { data, isLoading } = useQuery<
    (KcType & { errorsValue?: [string, string, number][]; errorContent?: string })[]
  >({
    queryKey: [QUERY_KEY.kcs.DASHBOARD_DATE, currentDate],
    queryFn: async () => await apiKCSDashboard(currentDate),
    enabled: !!currentDate,
    refetchInterval: 1000 * 60 * 3,
  });
  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="lg:p-0 w-full grid">
      <div
        id="header"
        className="relative h-fit w-full left-0 right-0 flex items-center px-2 py-1 bg-blue-500 text-white"
      >
        <Link to="/sanxuat" className="w-10">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
        <div className="flex items-center justify-center w-full gap-4">
          <h1 className="text-2xl uppercase font-bold">BÁO CÁO CHẤT LƯỢNG HÀNG NGÀY</h1>
          <Link to="/kcs/them-chi-tieu" className="hidden md:inline-flex">
            <img src="/images/plus.png" alt="xn1" width={35} />
          </Link>
          <a
            href={`${ENV_CONFIG.LARAVEL_URL}/kcs/download/${format(new Date(currentDate), "yyyy-MM-dd")}`}
            title="File báo cáo"
            className="w-8"
          >
            <img src="/images/file.png" alt="Xóa" />
          </a>
          <a
            className="hidden md:inline-flex"
            href={ENV_CONFIG.LARAVEL_URL + "/sanxuat/ket-thuc"}
            title="Đơn hàng đã xuất"
          >
            <img src="/images/history.png" alt="Báo cáo cuối ngày" width={40} />
          </a>
        </div>
        <div className="text-black">
          <input
            name="ngay"
            onChange={(e) => setCurrentDay(e.target.value)}
            type="date"
            id="date"
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            max={format(new Date(), "yyyy-MM-dd")}
          />
        </div>
      </div>
      <div className="relative">
        <table className="w-full text-base text-center text-black border">
          <thead className="font-bold uppercase bg-blue-500 text-white md:sticky md:top-0">
            <tr>
              <th className="border">Ngày</th>
              <th className="border">Chuyền</th>
              <th className="border">Khách hàng</th>
              <th className="border">Mã hàng</th>
              <th className="border">Lao động</th>
              <th className="border">Dự phòng</th>
              <th className="border">Chuyên dùng</th>
              <th className="border">tác nghiệp</th>
              <th className="border">thực hiện</th>
              <th className="border">nhập hoàn thành</th>
              <th className="border">Nhập thiếu</th>
              <th className="border">BTP cấp</th>
              <th className="border">Vốn</th>
              <th className="border">Chỉ tiêu ngày</th>
              <th className="border">SL đạt</th>
              <th className="border">TL thực hiện</th>
              <th className="border">SL lỗi</th>
              <th className="border">TL lỗi</th>
              <th className="border">Vướng mắc</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((kc) => {
                const von = calculatorRemaining(kc);
                const tldat = calculatorAchieveRate(kc);
                const tlloi = calculatorDefectRate(kc);
                return (
                  <tr className={``} key={kc.id}>
                    <td className="border px-1 group">
                      <div className="flex flex-col gap-2 justify-center items-center min-w-12">
                        <p>{format(kc.ngaytao, "dd-MM")}</p>
                        <a
                          className="hidden group-hover:inline-flex transition-all"
                          title="Tải báo cáo KCS"
                          href={ENV_CONFIG.LARAVEL_URL + "/kcs/download-with-line/" + kc.plan.id}
                        >
                          <img className="w-6" src="/images/download.png" alt="" />
                        </a>
                      </div>
                    </td>
                    <td className="p-1 border">
                      <Link
                        className={`${kc.plan.chuyen.startsWith("X1_") ? "text-blue-600" : "text-pink-500"} text-2xl font-bold`}
                        to={"/kcs/bao-cao/" + kc.id}
                      >
                        {kc.plan.chuyen}
                      </Link>
                    </td>
                    <td className="border px-1">{kc.plan.khachhang}</td>
                    <td className="border px-1">
                      <Link title={`TV ${kc.plan.chuyen}`} to={`/sanxuat/tv/` + kc.plan.chuyen}>
                        {kc.plan.mahang}
                      </Link>
                    </td>
                    <td className="border px-1">
                      <a href={ENV_CONFIG.LARAVEL_URL + "/kcs/sua/ldong-chitieu"}>{kc.laodong}</a>
                    </td>
                    <td className="border px-1">
                      <a href={ENV_CONFIG.LARAVEL_URL + "/kcs/sua/ldong-chitieu"}>{kc.duphong}</a>
                    </td>
                    <td className="border px-1">
                      <a href={ENV_CONFIG.LARAVEL_URL + "/kcs/sua/ldong-chitieu"}>
                        {kc.chuyendung}
                      </a>
                    </td>
                    <td className="border px-1">{kc.plan.sltacnghiep}</td>
                    <td className="border px-1">
                      <a
                        title="SL thực hiện ngày trước"
                        href={ENV_CONFIG.LARAVEL_URL + "/kcs/sua-hom-truoc/" + kc.id}
                      >
                        {kc.thuchien}
                      </a>
                    </td>
                    <td className="border px-1">{kc.nhaphoanthanh}</td>
                    <td className="border px-1">{kc.thuchien - kc.nhaphoanthanh}</td>
                    {/* <td className="border px-1">{calculatorBtps(kc.plan)}</td> */}
                    <td className="border px-1">{kc.btpcap}</td>
                    <td
                      className={`border font-semibold ${von > kc.plan.mucvon ? "text-red-500" : "text-green-500"}`}
                    >
                      {von.toFixed(1)}
                    </td>
                    <td className="border px-1">{kc.chitieungay}</td>
                    <td className="border bg-[yellow]">
                      <a
                        title="Tăng giảm SL đạt/lỗi"
                        href={ENV_CONFIG.LARAVEL_URL + "/kcs/sp-dat-loi/" + kc.id}
                        className="text-[#1447e6] font-bold"
                      >
                        {kc.sldat}
                      </a>
                    </td>
                    <td className={`border ${tldat > 95 ? "bg-green-300" : "bg-red-300"}`}>
                      {tldat.toFixed(1)}%
                    </td>
                    <td className="border px-1">
                      <a
                        title="Tăng giảm SL đạt/lỗi"
                        href={ENV_CONFIG.LARAVEL_URL + "/kcs/sp-dat-loi/" + kc.id}
                      >
                        {kc.slloi}
                      </a>
                    </td>
                    <td className={`border ${tlloi < 10 ? "bg-green-500" : "bg-red-300"}`}>
                      {tlloi.toFixed(1)}%
                    </td>
                    <td className="border px-1 text-left w-1/3">
                      <span className="flex-1 flex flex-col justify-evenly text-sm">
                        {kc.errorsValue &&
                          kc.errorsValue.length > 0 &&
                          kc.errorsValue.map((errorDetail, index) => (
                            <p key={index} className="line-clamp-2">
                              <span className="text-red-500">* {errorDetail[0]}:</span>
                              {errorDetail[1]} (
                              {errorDetail[2] % 1 == 0
                                ? errorDetail[2].toFixed(0)
                                : errorDetail[2].toFixed(2)}
                              %)
                            </p>
                          ))}
                        {kc?.errorContent}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KCSDashboardPage;
