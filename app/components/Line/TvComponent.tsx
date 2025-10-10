import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { apiLineGetTVInfo } from "~/apis/line.api";
import { QUERY_KEY } from "~/lib/queryKey";
import { calculatorAchieveRate, calculatorDefectRate, calculatorTargetNow } from "~/lib/utils";
import { linesList } from "~/lib/variables";
import type { KcType } from "~/types/kcs.type";
import type { PlanType } from "~/types/plan.type";
import Loading from "../Loading";
import Clock from "./Clock";

export default function TvComponent({ line, currentTime }: { line: string; currentTime?: Date }) {
  const { data, isLoading, isRefetching } = useQuery<{
    kcs?: KcType;
    plan: PlanType;
    sumBtpCap: number;
    von: number;
    errorDetails: [string, string, number][];
  }>({
    queryKey: [QUERY_KEY.line.TV, line],
    queryFn: () => apiLineGetTVInfo(line),
    enabled: !!line,
    refetchInterval: 1000 * 60 * 5,
  });

  if (isLoading || isRefetching) {
    return <Loading fullScreen />;
  }
  return (
    <>
      {data?.plan ? (
        <div className="h-screen w-screen bg-black text-white text-4xl uppercase font-bold grid grid-rows-7 gap-1">
          <div className="bg-white flex">
            <div className="w-1/6 border-r-2">
              <Clock currentTime={currentTime || new Date()} />
            </div>
            <div className="col-span-4 bg-blue-900 text-4xl px-2 py-1 grid grid-cols-2 gap-8 flex-1 border-l-2 border-r-2">
              <div className="flex justify-between">
                <div className="flex flex-col gap-4 justify-evenly">
                  <p>May Đông Hà</p>
                  <p>{linesList.find((l) => l.value === data.plan.chuyen)?.name}</p>
                </div>
                <Link className="flex justify-center items-center" to="/sanxuat">
                  <img src="/images/logo.png" alt="Logo" className="inline-block w-24" />
                </Link>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-center items-center h-full">
                  <img
                    src={`http://172.17.0.30:8000/storage/images/logo/${data.plan.khachhang}.png`}
                    className="inline-block max-w-24 h-full"
                  />
                </div>
                <div className="flex flex-col gap-4 justify-evenly text-right">
                  <a href={`http://172.17.0.30:8000/kehoach/sua-logo/${data.plan.id}`}>
                    {data.plan.khachhang}
                  </a>
                  <p>{data.plan.mahang}</p>
                </div>
              </div>
            </div>
            <div className="w-1/6 bg-blue-900 flex flex-col justify-evenly text-3xl px-2 h-full border-l-2">
              <a
                className="flex justify-between"
                href="http://172.17.0.30:8000/kcs/sua/ldong-chitieu"
              >
                <span className="text-[yellow]">Lao động</span>
                <span>{data.kcs?.laodong}</span>
              </a>
              <a
                className="flex justify-between"
                href="http://172.17.0.30:8000/kcs/sua/ldong-chitieu"
              >
                <span className="text-[yellow]">Dự phòng</span>
                <span>{data.kcs?.duphong}</span>
              </a>
              <a
                className="flex justify-between"
                href="http://172.17.0.30:8000/kcs/sua/ldong-chitieu"
              >
                <span className="text-[yellow]">C. dùng</span>
                <span>{data.kcs?.chuyendung}</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-6 text-black row-span-2 bg-[yellow] border-black">
            <div className="text-center border-r-2 border-black flex flex-col h-full py-2">
              <div className="h-1/3">
                <p className="text-blue-900">Tác nghiệp</p>
                <p className="text-2xl">Order qty</p>
              </div>
              <div className="justify-center items-center flex-1 flex text-[blue] text-[4rem] font-bold scale-y-150">
                <a href={`http://172.17.0.30:8000/kehoach/sua-kehoach/${data.plan.id}`}>
                  {data.plan.sltacnghiep}
                </a>
              </div>
            </div>
            <div className="text-center border-r-2 border-l-2 border-black flex flex-col h-full py-2">
              <div className="h-1/3">
                <p className="text-blue-900">Thực hiện</p>
                <p className="text-2xl">Finished</p>
              </div>
              <div className="justify-center items-center flex-1 flex text-[blue] text-[4rem] font-bold scale-y-150">
                <a href={`http://172.17.0.30:8000/kehoach/sua-kehoach/${data.plan.id}`}>
                  {data.plan.thuchien}
                </a>
              </div>
            </div>
            <div className="text-center border-r-2 border-l-2 border-black flex flex-col h-full py-2">
              <div className="h-1/3">
                <p className="text-blue-900">Nhập kho</p>
                <p className="text-2xl">Stored</p>
              </div>
              <div className="justify-center items-center flex-1 flex text-[blue] text-[4rem] font-bold scale-y-150">
                <a href={`http://172.17.0.30:8000/hoanthanh/cap-nhat-luy-ke`}>
                  {data.plan.nhaphoanthanh}
                </a>
              </div>
            </div>
            <div className="text-center border-r-2 border-l-2 border-black flex flex-col h-full py-2">
              <div className="h-1/3">
                <p className="text-blue-900">Nhập thiếu</p>
                <p className="text-2xl">remaining qty</p>
              </div>
              <div className="justify-center items-center flex-1 flex text-[blue] text-[4rem] font-bold scale-y-150">
                <a href={`http://172.17.0.30:8000/hoanthanh/cap-nhat-luy-ke`}>
                  {data.plan.thuchien - data.plan.nhaphoanthanh}
                </a>
              </div>
            </div>
            <div className="col-span-2 border-l-2 border-black h-full flex flex-col">
              <p className="text-[red] text-2xl text-center py-1 h-9">
                3 lỗi cao nhất / Top 3 errors
              </p>
              <div className="flex-1 flex flex-col justify-evenly gap-1 text-lg px-2">
                {data.errorDetails &&
                  data.errorDetails.length > 0 &&
                  data.errorDetails.map((errorDetail, index) => (
                    <p className="line-clamp-2" key={index}>
                      * {errorDetail[0]}: {errorDetail[1]} (
                      {errorDetail[2] % 1 == 0
                        ? errorDetail[2].toFixed(0)
                        : errorDetail[2].toFixed(2)}
                      %)
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-[yellow] border-black flex-1">
            <div className="border-r-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">BTP CẤP</p>
                <p className="text-black">semi-finished</p>
              </div>
              <div className="w-1/2 text-[blue] text-7xl font-extrabold flex flex-col justify-center">
                <a href={`http://172.17.0.30:8000/tocat/sua-btp/${data.plan.id}`}>
                  {data.sumBtpCap ?? "--"}
                </a>
              </div>
            </div>
            <div className="border-l-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">TỶ LỆ vỐN</p>
                <p className="text-black">Remaining rate</p>
              </div>
              <div className="w-1/2 text-[blue] text-7xl font-extrabold flex flex-col justify-center">
                <a
                  href={`http://172.17.0.30:8000/tocat/sua-btp/${data.plan.id}`}
                  className={`${
                    data.von && data.von > data.plan.mucvon
                      ? "animate-blink text-red-500"
                      : "text-[blue]"
                  }`}
                >
                  {data.von?.toFixed(1) ?? "--"}
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-[yellow] border-black flex-1">
            <div className="border-r-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">chỉ tiêu/Ngày</p>
                <p className="text-black">Target/day</p>
              </div>
              <div className="w-1/2 text-[blue] text-7xl font-extrabold flex flex-col justify-center">
                <a href="http://172.17.0.30:8000/kcs/sua/ldong-chitieu">
                  {data.kcs?.chitieungay ?? "--"}
                </a>
              </div>
            </div>
            <div className="border-l-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">Chỉ tiêu hiện tại</p>
                <p className="text-black">Target now</p>
              </div>
              <div className="w-1/2 text-[blue] text-7xl font-extrabold flex flex-col justify-center">
                {calculatorTargetNow(data.kcs?.chitieungay) ?? "--"}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-[#42d649] border-black flex-1">
            <div className="border-r-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">Sản phẩm đạt</p>
                <p className="text-black">Pass product</p>
              </div>
              <div className="w-1/2 text-[blue] text-7xl font-extrabold flex flex-col justify-center">
                {data.kcs?.sldat ?? "--"}
              </div>
            </div>
            <div className="border-l-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">Tỷ lệ đạt</p>
                <p className="text-black">Achieve rate</p>
              </div>
              <div className="w-1/2 text-[blue] text-7xl font-extrabold flex flex-col justify-center">
                {(data.kcs && calculatorAchieveRate(data.kcs).toFixed(1) + "%") ?? "--"}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 bg-[#f8766d] border-black flex-1">
            <div className="border-r-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">Sản phẩm lỗi</p>
                <p className="text-black">Defect product</p>
              </div>
              <div className="w-1/2 text-[red] text-7xl font-extrabold flex flex-col justify-center">
                {data.kcs?.slloi ?? "--"}
              </div>
            </div>
            <div className="border-l-2 border-black flex p-2">
              <div className="w-1/2 flex flex-col justify-center">
                <p className="text-blue-900">Tỷ lệ lỗi</p>
                <p className="text-black">Defect rate</p>
              </div>
              <div className="w-1/2 text-[red] text-7xl font-extrabold flex flex-col justify-center">
                {(data.kcs && calculatorDefectRate(data.kcs).toFixed(1) + "%") ?? "--"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen bg-black">
          <div className="w-full h-full flex justify-center items-center text-white">
            <h4 className="uppercase text-7xl font-bold">Chưa có thông tin sản xuất</h4>
          </div>
        </div>
      )}
    </>
  );
}
