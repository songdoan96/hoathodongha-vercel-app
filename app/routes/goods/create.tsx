import { format } from "date-fns";
import { House, Plus, Truck, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useGoodsCreate } from "~/hooks/goods-hook";
import routers from "~/lib/routers";
import { linesListFilter } from "~/lib/variables";
import type { GoodsOutItemsType } from "~/types/goods-type";

export default function create() {
  const [bophan, setBophan] = useState<string>();
  const [hoten, setHoten] = useState<string>();
  const [tungay, setTuNgay] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [denngay, setDenNgay] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [lists, setLists] = useState<GoodsOutItemsType[]>([{ hanghoa: "", soluong: 0 }]);
  const mutateGoodsCreate = useGoodsCreate();
  const navigate = useNavigate();
  const [guixe, setGuixe] = useState<string>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(lists, bophan, hoten);
    if (lists.length === 0 || !bophan || !hoten || !guixe) return;
    mutateGoodsCreate.mutate(
      {
        formData: {
          bophan,
          hoten,
          taisan: lists,
          tungay,
          denngay,
          guixe: guixe === "true",
        },
      },
      {
        onSuccess: () => {
          (toast.success("Thành công"), navigate(routers().goods.dashboard));
        },
        onError: () => toast.error("Có lỗi"),
      },
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center bg-blue-600 text-white p-1">
        <Link to={routers().goods.dashboard}>
          <img src="/images/logo.png" alt="" className="w-12 h-auto" />
        </Link>
        <h1 className="flex-1 text-center font-semibold text-lg lg:text-3xl">
          PHIẾU ĐƯỢC MANG TÀI SẢN <br className="inline lg:hidden" /> RA KHỎI CÔNG TY
        </h1>
      </div>
      <div className="max-w-5xl mx-auto p-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border border-blue-700 shadow">
          <Field className="px-2 gap-1">
            <FieldLabel htmlFor="hoten">Họ tên (*) </FieldLabel>
            <Input
              id="hoten"
              required
              value={hoten || ""}
              onChange={(e) => setHoten(e.target.value)}
            />
          </Field>
          <Field className="px-2 gap-1">
            <FieldLabel htmlFor="bophan">Bộ phận (*) </FieldLabel>
            <select
              className="border p-2 rounded-lg"
              value={bophan || ""}
              onChange={(e) => setBophan(e.target.value)}
              required
            >
              <option value={""}>Chọn tổ</option>
              {linesListFilter.map((line) => (
                <option key={line.value} value={line.value}>
                  {line.name}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex justify-center items-center w-full py-2 gap-4">
            <button
              type="button"
              onClick={() => setGuixe("false")}
              className={`${guixe === "false" ? "bg-teal-600 hover:bg-teal-500" : "bg-gray-600 hover:bg-gray-500"} w-32 text-base uppercase text-white inline-flex gap-2 items-center justify-center p-1 rounded`}
            >
              <House size={20} />
              <span>Hàng hóa</span>
            </button>
            <button
              type="button"
              onClick={() => setGuixe("true")}
              className={`${guixe === "true" ? "bg-pink-600 hover:bg-pink-500" : "bg-gray-600 hover:bg-gray-500"} w-32 text-base uppercase text-white inline-flex gap-2 items-center justify-center p-1 rounded`}
            >
              <Truck size={20} />
              <span> Gửi xe</span>
            </button>
          </div>
          {guixe && (
            <>
              {guixe === "false" && (
                <>
                  <FieldGroup className="px-2 gap-4 grid grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="tungay">Từ ngày: </FieldLabel>
                      <Input
                        id="tungay"
                        type="date"
                        value={tungay || ""}
                        onChange={(e) => setTuNgay(e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="denngay">Đến ngày: </FieldLabel>
                      <Input
                        id="denngay"
                        type="date"
                        value={denngay || ""}
                        onChange={(e) => setDenNgay(e.target.value)}
                        required
                      />
                    </Field>
                  </FieldGroup>
                </>
              )}
              {lists.map((list, index) => (
                <div key={index} className="border p-2 flex m-1 bg-gray-50 shadow">
                  <div className="flex flex-col flex-1 gap-1">
                    <Field orientation={"horizontal"}>
                      <FieldLabel htmlFor={"hanghoa" + index} className="w-28">
                        Tên h.hóa:
                      </FieldLabel>
                      <Input
                        id={"hanghoa" + index}
                        value={list.hanghoa}
                        onChange={(e) =>
                          setLists(() =>
                            lists.map((item, i) =>
                              i === index ? { ...item, hanghoa: e.target.value } : item,
                            ),
                          )
                        }
                        required
                      />
                    </Field>
                    <Field orientation={"horizontal"}>
                      <FieldLabel htmlFor={"soluong" + index} className="w-28">
                        Số lượng:
                      </FieldLabel>
                      <Input
                        id={"soluong" + index}
                        value={list.soluong || ""}
                        onChange={(e) =>
                          setLists(() =>
                            lists.map((item, i) =>
                              i === index ? { ...item, soluong: +e.target.value } : item,
                            ),
                          )
                        }
                        type="number"
                        min={1}
                        required
                      />
                    </Field>
                    <Field orientation={"horizontal"}>
                      <FieldLabel htmlFor={"lydo" + index} className="w-28">
                        Lý do:
                      </FieldLabel>
                      <Input
                        id={"lydo" + index}
                        value={list?.lydo || ""}
                        onChange={(e) =>
                          setLists(() =>
                            lists.map((item, i) =>
                              i === index ? { ...item, lydo: e.target.value } : item,
                            ),
                          )
                        }
                      />
                    </Field>
                  </div>
                  <div className="mx-4">
                    <button
                      type="button"
                      onClick={() => setLists(() => lists.filter((_, i) => i !== index))}
                    >
                      <X size={30} color="red" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={(e) => {
                    setLists(() => [...lists, { hanghoa: "", soluong: 0 }]);
                  }}
                  className="h-10 w-10 border rounded-full flex justify-center items-center bg-blue-50"
                >
                  <Plus color="blue" size={30} />
                </button>
              </div>
            </>
          )}
          <Field className="bg-blue-50 p-4 mt-2">
            <Button
              type={guixe ? "submit" : "button"}
              variant={guixe ? "default" : "outline"}
              className="inline-flex max-w-32 mx-auto"
            >
              Tạo phiếu
            </Button>
          </Field>
        </form>
      </div>
    </div>
  );
}
