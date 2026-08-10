import { ClipboardPlus } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useGoodsFindAll } from "~/hooks/goods-hook";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";

export default function dashboard() {
  const { user } = useAuthStore();
  const { data, isLoading } = useGoodsFindAll();
  if (isLoading) return <Loading fullScreen />;
  return (
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      <HeaderComponent>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách đăng ký làm thêm giờ
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
    </div>
  );
}
