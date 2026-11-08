import { differenceInMinutes } from "date-fns";
import { ArrowLeft, Clock, Minus, Plus, User, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import {
  useGuestFlowFindOne,
  useGuestFlowOutCreate,
} from "~/hooks/guestflow-hook";
import routers from "~/lib/routers";

export default function out() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soluong, setSoluong] = useState(0);
  const [dave, setDave] = useState(0); //0: xetai/container , 1: oto, 2: xemay, 3: di bo
  const [isOver, setIsOver] = useState(true);
  const [ghichu, setGhiChu] = useState<string>();
  const mutateGuestFlowOutCreate = useGuestFlowOutCreate();
  if (!id) return null;
  const { data: guest, isLoading } = useGuestFlowFindOne(id);
  useEffect(() => {
    if (guest) {
      const dave = guest.guestFlowOuts.reduce(
        (total, out) => total + out.soluong,
        0,
      );
      setDave(dave);
      setSoluong(guest.soluongnguoi - dave);
    }
  }, [guest]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!id) return;
    mutateGuestFlowOutCreate.mutate(
      {
        guestFlowId: id,
        soluong,
        ghichu,
      },
      {
        onSuccess: () => {
          toast.success("Thành công");
          navigate(routers().guestFlow.dashboard);
        },
      },
    );
  }
  if (isLoading) return <Loading fullScreen />;
  return (
    <div className="h-screen md:h-auto min-h-100 w-screen flex p-2">
      <div className="shadow-lg border border-green-500 mx-auto w-full max-w-3xl rounded-2xl overflow-hidden">
        <div className="bg-green-700 flex items-center p-2">
          <Link to={routers().guestFlow.dashboard}>
            <img src="/images/logo.png" alt="Logo" className="w-12" />
          </Link>
          <h1 className="uppercase text-white font-semibold text-xl md:text-3xl text-center w-full">
            Ghi nhận giờ ra
          </h1>
        </div>
        {guest && (
          <form
            className="p-2 grid gap-8 py-8 px-2 md:px-4"
            onSubmit={handleSubmit}
          >
            <Field className="gap-1 border-2 border-green-500 rounded-xl p-2 text-lg">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex items-center justify-center gap-2">
                    <Users color="teal" />
                    <h1 className="font-semibold">{guest.khachhang}</h1>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <h1 className="font-semibold">
                      {(
                        differenceInMinutes(
                          new Date(),
                          new Date(guest.createdAt),
                        ) / 60
                      ).toFixed(1)}
                      h
                    </h1>
                    <Clock color="teal" />
                  </div>
                </div>
                <div className="flex justify-between font-semibold">
                  <h1>Vào cổng: {guest.soluongnguoi} người</h1>
                  <h1>Đã về: {dave} người</h1>
                </div>
              </div>
            </Field>
            <Field className="gap-1">
              <div className="grid grid-cols-2 gap-6 md:gap-16">
                <div
                  className={`border-2 text-center uppercase p-4 text-xl md:text-2xl font-semibold flex flex-col md:flex-row items-center justify-center gap-2 rounded-2xl ${isOver ? "border-green-600 bg-green-50 text-green-800" : "bg-gray-100"}`}
                  onClick={() => setIsOver(true)}
                >
                  <User />
                  <h1>về hết</h1>
                </div>
                <div
                  className={`border-2 text-center uppercase p-4 text-xl md:text-2xl font-semibold flex flex-col md:flex-row items-center justify-center gap-2 rounded-2xl ${!isOver ? "border-green-600 bg-green-50 text-green-800" : "bg-gray-100"}`}
                  onClick={() => setIsOver(false)}
                >
                  <Users />
                  <h1>về một số</h1>
                </div>
              </div>
            </Field>
            {!isOver && (
              <>
                <Field className="gap-1">
                  <FieldLabel className="font-semibold text-xl uppercase flex justify-center items-center">
                    Số lượng Người ra?
                  </FieldLabel>
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-300 rounded-xl p-4 px-8">
                    <button
                      type="button"
                      onClick={() => setSoluong(Math.max(1, soluong - 1))}
                      className="w-16 h-16 bg-green-800 hover:bg-green-900 text-white rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer active:scale-95"
                    >
                      <Minus />
                    </button>

                    <div className="text-center">
                      <div className="text-5xl font-black font-mono text-green-900 tabular-nums">
                        {soluong}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setSoluong(
                          Math.min(guest.soluongnguoi - dave, soluong + 1),
                        )
                      }
                      className="w-16 h-16 bg-green-800 hover:bg-green-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer active:scale-95"
                    >
                      <Plus />
                    </button>
                  </div>
                </Field>
                <Field className="gap-1">
                  <FieldLabel
                    htmlFor="ghichu"
                    className="font-semibold text-xl uppercase flex justify-center items-center"
                  >
                    Ai ra ? (Ghi chú)
                  </FieldLabel>
                  <Input
                    id="ghichu"
                    name="ghichu"
                    className="w-full h-10 px-4 text-base sm:text-lg font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-lg focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    value={ghichu}
                    onChange={(e) => setGhiChu(e.target.value)}
                  />
                </Field>
              </>
            )}

            <Field className="gap-1 mt-4">
              <Button
                className="p-6 text-3xl uppercase font-semibold bg-green-700 hover:bg-green-800"
                type="submit"
                disabled={dave === guest.soluongnguoi}
              >
                Xác nhận về
              </Button>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="text-center inline-flex gap-2 mt-4 px-8 py-2 mx-auto uppercase text-xl text-red-600 hover:bg-red-100 rounded"
                  type="button"
                >
                  <ArrowLeft />
                  Hủy
                </button>
              </div>
            </Field>
          </form>
        )}
      </div>
    </div>
  );
}
