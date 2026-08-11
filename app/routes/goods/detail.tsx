import { format, isSameDay } from "date-fns";
import React from "react";
import { Link, useParams } from "react-router";
import Loading from "~/components/Loading";
import { useGoodsFinOne, useGoodsSignature } from "~/hooks/goods-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";

export default function detail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  if (!id) return;
  const { data, isLoading, refetch } = useGoodsFinOne(id);
  const mutateGoodsSignature = useGoodsSignature();
  function handleSignature(chucvu: "totruong" | "quandoc" | "lanhdao") {
    if (!id || !user || !chucvu) return;
    mutateGoodsSignature.mutate(
      {
        id,
        formData: {
          ten: user.name,
          chucvu,
        },
      },
      { onSuccess: () => refetch() },
    );
  }
  if (isLoading) return <Loading fullScreen />;
  if (data)
    return (
      <div className="h-screen w-screen flex justify-center items-center p-2">
        <div className="w-full max-w-5xl mx-auto border shadow p-4 min-h-3/4">
          <div className="flex justify-between font-semibold text-[0.4rem] lg:text-lg">
            <div className="flex flex-col uppercase justify-center items-center">
              <h3>Tổng công ty CP dệt may hòa thọ</h3>
              <h3>Công ty may hòa thọ đông hà</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
              <h3>Độc lập - Tự do - Hạnh phúc</h3>
            </div>
          </div>
          <h1 className="text-center my-6 text-lg lg:text-2xl font-bold">
            PHIẾU ĐƯỢC MANG TÀI SẢN RA KHỎI CÔNG TY
          </h1>
          <div className="flex flex-col w-full">
            <h5>Tôi tên là: {data?.hoten}</h5>
            <h5>Bộ phận công tác: {linesList.find((line) => line.value === data?.bophan)?.name}</h5>
            <h5>
              Ngày:{" "}
              {isSameDay(data.tungay, data.denngay)
                ? format(data.denngay, "dd/MM")
                : `${format(data.tungay, "dd/MM")}-${format(data.denngay, "dd/MM")}`}
            </h5>
            <p>Đề nghị được mang ra khỏi cổng công ty tài sản, trang thiết bị, hàng hóa sau:</p>
            <div className="w-full overflow-hidden my-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="border p-1">STT</th>
                    <th className="border p-1">Tên hàng hóa</th>
                    <th className="border p-1">Số lượng</th>
                    <th className="border p-1">Lý do đưa hàng hóa đi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.taisan.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-1 text-center">{index + 1}</td>
                      <td className="border p-1">{item.hanghoa}</td>
                      <td className="border p-1">{item.soluong}</td>
                      <td className="border p-1">{item.lydo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 w-full gap-6 lg:gap-0 mt-4">
            <div className="flex flex-col items-center">
              <p>Tổ trưởng</p>
              <p className="mt-2 font-semibold">
                {data.totruong ? (
                  data.totruong
                ) : user?.bophan === data.bophan ? (
                  <button
                    className="text-red-500 underline"
                    onClick={() => handleSignature("totruong")}
                  >
                    Ký đơn
                  </button>
                ) : (
                  <Link className="text-red-500 underline" to={routers().auth.login}>
                    Ký đơn
                  </Link>
                )}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p>Quản đốc</p>
              <p className="mt-2 font-semibold">
                {data.quandoc ? (
                  data.quandoc
                ) : user?.bophan.includes("_quandoc") ? (
                  <button
                    className="text-red-500 underline"
                    onClick={() => handleSignature("quandoc")}
                  >
                    Ký đơn
                  </button>
                ) : (
                  <Link className="text-red-500 underline" to={routers().auth.login}>
                    Ký đơn
                  </Link>
                )}
              </p>
            </div>
            <div className="flex flex-col items-center col-span-2 lg:col-span-1">
              <p>Ban Giám Đốc</p>
              <p className="mt-2 font-semibold">
                {data.lanhdao ? (
                  data.lanhdao
                ) : user?.bophan === "giamdoc" || user?.bophan === "lanhdao" ? (
                  <button
                    className="text-red-500 underline"
                    onClick={() => handleSignature("lanhdao")}
                  >
                    Ký đơn
                  </button>
                ) : (
                  <Link className="text-red-500 underline" to={routers().auth.login}>
                    Ký đơn
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
