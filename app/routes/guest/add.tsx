import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import GuestIcon from "~/features/guest/components/GuestIcon";
import { GUEST_VEHICLE } from "~/features/guest/libs";
import { useGuestFlowCreate } from "~/hooks/guestflow-hook";
import routers from "~/lib/routers";

export default function add() {
  const navigate = useNavigate();
  const [khachhang, setKhachhang] = useState("");
  const [soluongnguoi, setSoluongnguoi] = useState(1);
  const [phuongtien, setPhuongtien] = useState(0); //0: xetai/container , 1: oto, 2: xemay, 3: di bo
  const [bienso, setBienso] = useState<string>();
  const mutateGuestFlowCreate = useGuestFlowCreate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!khachhang) return;
    mutateGuestFlowCreate.mutate(
      { khachhang, soluongnguoi, phuongtien, bienso },
      {
        onSuccess: () => {
          toast.success("Đăng ký thành công");
          setKhachhang("");
          navigate(routers().guestFlow.dashboard);
        },
      },
    );
  }
  return (
    <div className="h-screen md:h-auto w-screen flex justify-center items-center p-2">
      <div className="shadow-lg border border-blue-500 mx-auto w-full max-w-3xl rounded-2xl overflow-hidden">
        <div className="bg-blue-500 flex items-center p-2">
          <img src="/images/logo.png" alt="Logo" className="w-12" />
          <h1 className="uppercase text-white font-semibold text-xl md:text-3xl text-center w-full">
            Đăng ký vào cổng
          </h1>
        </div>
        <form className="p-4 grid gap-8" onSubmit={handleSubmit}>
          <Field className="gap-1">
            <FieldLabel
              htmlFor="khachhang"
              className="font-semibold text-xl uppercase"
            >
              1.Tên khách (*)
            </FieldLabel>
            <Input
              required
              id="khachhang"
              name="khachhang"
              className="w-full h-12 px-4 text-base sm:text-lg font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={khachhang}
              onChange={(e) => setKhachhang(e.target.value)}
            />
          </Field>
          <Field className="gap-1">
            <FieldLabel
              htmlFor="phuongtien"
              className="font-semibold text-xl uppercase"
            >
              2.Phương tiện
            </FieldLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GUEST_VEHICLE.map((item) => {
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`flex justify-center items-center p-2 md:p-4 rounded-2xl border-2 ${phuongtien === item.id ? "border-blue-500 bg-blue-50" : ""}`}
                    onClick={() => setPhuongtien(item.id)}
                  >
                    <GuestIcon id={item.id} isActive={phuongtien === item.id} />
                  </button>
                );
              })}
            </div>
          </Field>
          <Field className="gap-1">
            <FieldLabel className="font-semibold text-xl uppercase">
              3.Số lượng Người ?
            </FieldLabel>
            <div className="flex items-center justify-between bg-slate-50 border border-slate-300 rounded-xl p-2 h-20 px-8">
              <button
                type="button"
                onClick={() => setSoluongnguoi(Math.max(1, soluongnguoi - 1))}
                className="w-16 h-16 bg-blue-800 hover:bg-blue-900 text-white rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer active:scale-95"
              >
                <Minus />
              </button>

              <div className="text-center">
                <div className="text-5xl font-black font-mono text-blue-900 tabular-nums">
                  {soluongnguoi}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSoluongnguoi(soluongnguoi + 1)}
                className="w-16 h-16 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer active:scale-95"
              >
                <Plus />
              </button>
            </div>
          </Field>
          <Field className="gap-1">
            <FieldLabel
              htmlFor="bienso"
              className="font-semibold text-xl uppercase"
            >
              4.Biển số
            </FieldLabel>
            <Input
              id="bienso"
              name="bienso"
              className="w-full h-12 px-4 text-base sm:text-lg font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={bienso || ""}
              onChange={(e) => setBienso(e.target.value)}
            />
          </Field>
          <Field className="gap-1 mt-6">
            <Button
              className="p-6 text-3xl uppercase font-semibold"
              type="submit"
            >
              Đăng ký
            </Button>
          </Field>
        </form>
      </div>
    </div>
  );
}
