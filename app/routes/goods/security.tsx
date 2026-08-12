import { format, isSameDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { useGoodsFindAll, useGoodsSecuritySignature, useGoodsSignature } from "~/hooks/goods-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

export default function security() {
  const { user } = useAuthStore();
  const { data, isLoading, refetch } = useGoodsFindAll();
  const [open, setOpen] = React.useState(false);
  const [baove, setBaove] = useState("");
  console.log("🚀 ~ security ~ baove:", baove);
  const mutateGoodsSignature = useGoodsSecuritySignature();
  const [idSelect, setIdSelect] = useState<string>();

  useEffect(() => {
    const baove = localStorage.getItem("hanghoa-baove") || "";
    setBaove(baove);
  }, []);

  if (isLoading) return <Loading fullScreen />;
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("🚀 ~ handleSubmit ~ baove:", baove);

    if (!idSelect || !baove) return;
    mutateGoodsSignature.mutate(
      {
        id: idSelect,
        formData: {
          ten: baove,
        },
      },
      {
        onSuccess: () => {
          refetch();
          localStorage.setItem("hanghoa-baove", baove);
          setOpen(false);
          setIdSelect(undefined);
          toast.success("Thành công");
        },
        onError: () => toast.error("Có lỗi"),
      },
    );
  }
  return (
    <div className="w-full h-full min-h-screen bg-white flex flex-col">
      <HeaderComponent logoLink={routers().forms.security}>
        <span className="uppercase text-white font-bold text-center w-full lg:text-2xl">
          Danh sách phiếu đem hàng hóa ra cổng
        </span>
      </HeaderComponent>
      <div className="w-full overflow-scroll">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="border p-1 bg-blue-700 text-white">Ngày</th>
              <th className="border p-1 bg-blue-700 text-white">Họ tên</th>
              <th className="border p-1 bg-blue-700 text-white">Bộ phận</th>
              <th className="border p-1 bg-blue-700 text-white">Loại</th>
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
                  {good.guixe ? (
                    <Link to={routers().goods.detail(good.id)}>
                      {format(good.createdAt, "dd/MM")}
                    </Link>
                  ) : (
                    <Link to={routers().goods.detail(good.id)}>
                      {format(good?.tungay || good.createdAt, "dd/MM")}-
                      {format(good?.denngay || good.createdAt, "dd/MM")}
                    </Link>
                  )}
                </td>
                <td className="border text-center min-w-32">
                  <Link to={routers().goods.detail(good.id)}>{good.hoten}</Link>
                </td>
                <td className="border text-center min-w-20">
                  <Link to={routers().goods.detail(good.id)}>
                    {linesList.find((line) => line.value === good.bophan)?.name}
                  </Link>
                </td>
                <td className="border text-center min-w-20">
                  <Link to={routers().goods.detail(good.id)}>
                    {good.guixe ? (
                      <span className="text-pink-700 font-semibold">Gửi xe</span>
                    ) : (
                      <span className="text-teal-700 font-semibold">Hàng hóa</span>
                    )}
                  </Link>
                </td>
                <td className="border p-1 min-w-52">
                  <Link to={routers().goods.detail(good.id)} className="flex flex-col">
                    {good.taisan.map((item, index) => (
                      <p key={index}>
                        &#x2022; {item.hanghoa} ({item.soluong})
                      </p>
                    ))}
                  </Link>
                </td>
                <td className="border p-1 text-center min-w-32">{good.totruong}</td>
                <td className="border p-1 text-center min-w-32">{good.quandoc}</td>
                <td className="border p-1 text-center min-w-32">{good.lanhdao}</td>
                <td className="border p-1 text-center min-w-32">
                  <div className="flex flex-col">
                    <p>
                      {good.baove || (
                        <button
                          type="button"
                          onClick={() => {
                            setOpen(true);
                            setIdSelect(good.id);
                          }}
                        >
                          ---
                        </button>
                      )}
                    </p>
                    {good.baoveTime && (
                      <p className="text-[12px] text-green-600 font-semibold">
                        {format(good.baoveTime, "dd/MM-HH:mm")}
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Bảo vệ: </AlertDialogTitle>
              <AlertDialogDescription />
            </AlertDialogHeader>

            <Input
              id="baove"
              name="baove"
              value={baove}
              onChange={(e) => setBaove(e.target.value)}
              required
              className="mb-4"
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction type="submit">Xác nhận</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
