import { Plus, Square, SquareCheckBig } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Field, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useGoodsCreate } from "~/hooks/goods-hook";
import routers from "~/lib/routers";
import { linesListFilter } from "~/lib/variables";
import routes from "~/routes";
import type { GoodsOutItemsType } from "~/types/goods-type";

export default function create() {
  const [bophan, setBophan] = useState<string>();
  const [hoten, setHoten] = useState<string>();
  const [tungay, setTuNgay] = useState<string>();
  const [lists, setLists] = useState<GoodsOutItemsType[]>([{ hanghoa: "", soluong: 0 }]);
  const [isMultiDates, setIsMultiDates] = useState<boolean>(false);
  const mutateGoodsCreate = useGoodsCreate();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(lists, bophan, hoten);
    if (lists.length === 0 || !bophan || !hoten) return;
    mutateGoodsCreate.mutate(
      { formData: { bophan, hoten, taisan: lists, tungay } },
      {
        onSuccess: () => {
          (toast.success("Thành công"), navigate(routers().goods.dashboard));
        },
        onError: () => toast.warning("Thành công"),
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
      <div className="max-w-3xl mx-auto p-2">
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
            {/* <Select required value={bophan} onValueChange={(e) => setBophan(e)} re>
              <SelectTrigger className="w-full" id="bophan" req>
                <SelectValue req />
              </SelectTrigger>
              <SelectContent req>
                <SelectGroup req>
                  <SelectLabel>Chọn tổ</SelectLabel>
                  {linesListFilter.map((line) => (
                    <SelectItem key={line.value} value={line.value}>
                      {line.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </Field>
          <Field className="px-2 gap-1">
            <div className="my-1">
              <button
                type="button"
                onClick={(e) => setIsMultiDates(!isMultiDates)}
                className="flex items-center gap-2"
              >
                <span>{isMultiDates ? <SquareCheckBig /> : <Square />}</span>
                <span> Nhiều ngày</span>
              </button>
            </div>
          </Field>
          {isMultiDates && (
            <Field className="px-2 gap-1">
              <FieldLabel htmlFor="tungay">Từ ngày - Đến ngày: </FieldLabel>
              <Input id="tungay" value={tungay || ""} onChange={(e) => setTuNgay(e.target.value)} />
            </Field>
          )}
          {lists.map((list, index) => (
            <div key={index} className="border p-2 flex flex-col m-1 bg-gray-50 gap-1 shadow">
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
          ))}
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={(e) => {
                setLists(() => [...lists, { hanghoa: "", soluong: 0 }]);
              }}
            >
              <Plus color="blue" size={30} />
            </button>
          </div>

          <Field className="bg-blue-50 p-4 mt-2">
            <Button type="submit" className="inline-flex max-w-32 mx-auto">
              Tạo phiếu
            </Button>
          </Field>
        </form>
      </div>
    </div>
  );
}
