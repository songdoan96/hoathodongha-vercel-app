import { Briefcase, Minus, Plus, Truck, Users, Wrench } from "lucide-react";
import React from "react";
import { HeaderComponent } from "~/components/Header";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { FormDescription, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function add() {
  return (
    <div>
      <HeaderComponent>
        <div className="flex justify-center items-center flex-1">
          <h1 className="uppercase text-white font-semibold">
            Đăng ký vào cổng
          </h1>
        </div>
      </HeaderComponent>
      <div className="flex p-2">
        <div className="shadow">
          <form>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                Tên khách
              </FieldLabel>
              <Input required />
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                Phương tiện
              </FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  //   onClick={() => handleSelectPurpose("giaohang")}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between `}
                >
                  <Truck className={`w-6 h-6 mb-1text-slate-500`} />
                  <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                    Giao Nhận Hàng
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Xuống kho hàng
                  </span>
                </button>

                <button
                  type="button"
                  //   onClick={() => handleSelectPurpose("suachua")}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between `}
                >
                  <Wrench className={`w-6 h-6 mb-1text-slate-500`} />
                  <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                    Sửa Chữa Máy
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Vào khu vực xưởng
                  </span>
                </button>

                <button
                  type="button"
                  //   onClick={() => handleSelectPurpose("hop")}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between `}
                >
                  <Briefcase className={`w-6 h-6 mb-1text-slate-500`} />
                  <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                    Gặp Lãnh Đạo
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Lên văn phòng họp
                  </span>
                </button>

                <button
                  type="button"
                  //   onClick={() => handleSelectPurpose("phongvan")}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between`}
                >
                  <Users className={`w-6 h-6 mb-1text-slate-500`} />
                  <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                    Phỏng Vấn
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Phòng nhân sự
                  </span>
                </button>
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                Đoàn Đi Mấy Người?
              </FieldLabel>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-300 rounded-xl p-2 h-20">
                <button
                  type="button"
                  //   onClick={() =>
                  //     // setCompanionCount(Math.max(0, companionCount - 1))
                  //   }
                  className="w-14 h-14 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-800 text-2xl font-bold cursor-pointer active:scale-95"
                >
                  <Minus className="w-6 h-6" />
                </button>

                <div className="text-center">
                  <div className="text-3xl font-black font-mono text-blue-900 tabular-nums">
                    {/* {1 + companionCount} */}
                    111
                  </div>
                  <div className="text-[11px] text-slate-500 font-bold">
                    {/* {companionCount === 0
                      ? "Đi 1 mình"
                      : `1 khách + ${companionCount} người đi cùng`} */}
                    Đi 1 mình
                  </div>
                </div>

                <button
                  type="button"
                  //   onClick={() => setCompanionCount(companionCount + 1)}
                  className="w-14 h-14 bg-blue-800 hover:bg-blue-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer active:scale-95"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </Field>
          </form>
        </div>
      </div>
    </div>
  );
}
