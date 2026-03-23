import { Signature } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useOvertimesEdit, useOvertimesFindOne } from "~/hooks/overtimes-hook";
import useAuthStore from "~/stores/auth-store";
import type { Route } from "./+types/detail";
export async function loader({ params }: Route.ClientLoaderArgs) {
  return params.id;
}

function OvertimeEdit({ params: { id } }: Route.ClientLoaderArgs) {
  const { data: overtime, isLoading } = useOvertimesFindOne(id);

  const { user } = useAuthStore();
  const { mutate: mutateEdit } = useOvertimesEdit();
  const [ngay, setNgay] = useState("");
  const [gio, setGio] = useState("");
  useEffect(() => {
    if (overtime) {
      setNgay(overtime.ngay);
      setGio(overtime.gio);
    }
  }, [overtime]);

  function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && ngay && gio) {
      mutateEdit({
        id,
        formData: {
          ngay,
          gio,
          lanhdao: user.name,
        },
      });
    }
  }

  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div className="h-screen w-screen bg-gray-100">
      <HeaderComponent>
        <HeaderTitle>Chỉnh sửa đơn</HeaderTitle>
      </HeaderComponent>
      <div className="p-2">
        <form
          onSubmit={handleEdit}
          className="mx-auto grid grid-cols-1 lg:max-w-3xl gap-8 bg-white border shadow-2xl p-2 py-4 lg:p-8"
        >
          <div className="bg-blue-100 shadow-xl p-2 lg:p-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <p className="uppercase text-blue-500 font-semibold w-32">Bộ phận</p>
              <p>: {overtime?.bophan}</p>
            </div>
            <div className="flex gap-2">
              <p className="uppercase text-blue-500 font-semibold w-32">Lý do</p>
              <p>: {overtime?.lydo}</p>
            </div>
            <div className="flex gap-2">
              <p className="uppercase text-blue-500 font-semibold w-32">Số lượng</p>
              <p>: {overtime?.danhsach.length} người</p>
            </div>
            <div className="flex gap-2">
              <p className="uppercase text-blue-500 font-semibold w-32">Tổ trưởng</p>
              <p>: {overtime?.totruong}</p>
            </div>
            <div className="flex gap-2">
              <p className="uppercase text-blue-500 font-semibold w-32">Quản đốc</p>
              <p>: {overtime?.quandoc}</p>
            </div>
          </div>
          {overtime && (
            <div className="flex flex-col flex-wrap gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="ngay">Ngày đăng ký</Label>
                <Input
                  value={ngay}
                  id="ngay"
                  name="ngay"
                  onChange={(e) => setNgay(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="gio">Giờ đăng ký</Label>
                <Input
                  value={gio}
                  id="gio"
                  name="gio"
                  onChange={(e) => setGio(e.target.value)}
                  required
                />
              </div>
              <div className="mx-auto mt-8">
                <Button type="submit" className="uppercase">
                  <Signature />
                  <span>Sửa và ký đơn</span>
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default OvertimeEdit;
