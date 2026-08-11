import { format, isSameDay } from "date-fns";
import { ClipboardPlus } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useGoodsFindAll } from "~/hooks/goods-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";

export default function dashboard() {
  const { user } = useAuthStore();
  console.log("🚀 ~ dashboard ~ user:", user);
  const { data, isLoading } = useGoodsFindAll();
  console.log(`🚀 ~ dashboard ~  { data, isLoading }:`, { data, isLoading });
  if (isLoading) return <Loading fullScreen />;
  return (
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      <HeaderComponent>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách phiếu đem hàng hóa ra cổng
        </span>
      </HeaderComponent>
      <div className="text-blue-600 my-4 flex justify-center items-center">
        <Link
          to={routers().goods.create}
          className="uppercase font-semibold flex items-center gap-1 bg-blue-100 hover:bg-blue-200 p-2 px-4 rounded"
        >
          <ClipboardPlus />
          <span>Tạo phiếu</span>
        </Link>
      </div>
      <div className="w-full overflow-hidden">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="border p-1 bg-blue-700 text-white">Ngày tạo</th>
              <th className="border p-1 bg-blue-700 text-white">Họ tên</th>
              <th className="border p-1 bg-blue-700 text-white">Bộ phận</th>
              <th className="border p-1 bg-blue-700 text-white">Ngày</th>
              <th className="border p-1 bg-blue-700 text-white">Tài sản</th>
              <th className="border p-1 bg-blue-700 text-white">Tổ trưởng</th>
              <th className="border p-1 bg-blue-700 text-white">Quản đốc</th>
              <th className="border p-1 bg-blue-700 text-white">Lãnh đạo</th>
              <th className="border p-1 bg-blue-700 text-white">Bảo vệ</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((good, index) => (
              <tr key={index}>
                <td className="border p-1 text-center">
                  <Link to={routers().goods.detail(good.id)}>
                    {format(good.createdAt, "dd/MM")}
                  </Link>
                </td>
                <td className="border p-1 text-center">
                  <Link to={routers().goods.detail(good.id)}>{good.hoten}</Link>
                </td>
                <td className="border p-1 text-center">
                  <Link to={routers().goods.detail(good.id)}>
                    {linesList.find((line) => line.value === good.bophan)?.name}
                  </Link>
                </td>
                <td className="border p-1 text-center">
                  <Link to={routers().goods.detail(good.id)}>
                    {isSameDay(good.tungay, good.denngay)
                      ? format(good.denngay, "dd/MM")
                      : `${format(good.tungay, "dd/MM")}-${format(good.denngay, "dd/MM")}`}
                  </Link>
                </td>
                <td className="border p-1">
                  <Link to={routers().goods.detail(good.id)} className="flex flex-col">
                    {good.taisan.map((item, index) => (
                      <p key={index}>
                        {index + 1}.{item.hanghoa} ({item.soluong})
                      </p>
                    ))}
                  </Link>
                </td>
                <td className="border p-1 text-center">{good.totruong}</td>
                <td className="border p-1 text-center">{good.quandoc}</td>
                <td className="border p-1 text-center">{good.lanhdao}</td>
                <td className="border p-1 text-center">{good.baove}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
