import { addMonths, format, subMonths } from "date-fns";
import { ChevronsLeft, ChevronsRight, FilterIcon, FilterX, Search, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import Loading from "~/components/Loading";
import { useFormsCount, useFormsFindAll } from "~/hooks/forms-hook";
import { checkRole } from "~/lib/helpers";
import { linesListFilter } from "~/lib/variables";
import type { FormsType } from "~/types/forms-type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import FormTRow from "./TRow";

function FormsListComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || format(new Date(), "yyyy-MM");
  const type = searchParams.get("type") || undefined;
  const value = searchParams.get("value") || undefined;
  const [searchMSNV, setSearchMSNV] = useState<string>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFormsFindAll({
    month,
    type,
    value,
  });
  const { data: formsCount } = useFormsCount(month);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  const prevMonth = format(subMonths(new Date(month), 1), "yyyy-MM");
  const nextMonth = format(addMonths(new Date(month), 1), "yyyy-MM");
  const allForms = data?.pages.flatMap((page) => page.forms) ?? [];

  return (
    <div>
      {allForms.length > 0 && (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-black">
            <thead className="text-white uppercase bg-[#27AE60]">
              <tr>
                <th scope="col" className="p-1 border border-black text-center">
                  Ngày tạo
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Họ tên
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span>Tổ</span>
                    {type === "to" ? (
                      <FilterX
                        className="ml-2 cursor-pointer"
                        color="red"
                        size={18}
                        onClick={() =>
                          setSearchParams({
                            month,
                          })
                        }
                      />
                    ) : (
                      <>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <FilterIcon color="white" size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Tìm kiếm theo tổ</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {linesListFilter.map((line) => (
                              <DropdownMenuItem
                                onClick={() =>
                                  setSearchParams({
                                    month,
                                    type: "to",
                                    value: line.value,
                                  })
                                }
                                key={line.value}
                              >
                                {line.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                  </div>
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  <div className="flex items-center justify-center">
                    <span className="mr-2">MSNV</span>
                    {type === "msnv" ? (
                      <SearchX
                        className="cursor-pointer"
                        color="red"
                        size={18}
                        onClick={() => {
                          setSearchParams({
                            month,
                          });
                        }}
                      />
                    ) : (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Search color="white" size={18} />
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[300px]">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tìm theo MSNV</AlertDialogTitle>
                              <AlertDialogDescription />
                            </AlertDialogHeader>
                            <Input
                              placeholder="Nhập MSNV"
                              onChange={(e) => setSearchMSNV(e.target.value)}
                              id="msnv"
                              className="col-span-2 h-8"
                            />
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => {
                                  setSearchMSNV("");
                                }}
                              >
                                Hủy
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  setSearchParams({
                                    month,
                                    type: "msnv",
                                    value: searchMSNV,
                                  });
                                }}
                              >
                                Tìm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Loại đơn
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Số lần
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Thời gian
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Lý do
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Thay thế
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Tổ trưởng
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Quản đốc
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  lãnh đạo
                </th>
                <th scope="col" className="p-1 border border-black text-center">
                  Giờ ra - vào
                </th>
                {checkRole("tochuc") && (
                  <th scope="col" className="p-1 border border-black text-center"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {allForms.map((form: FormsType) => {
                return (
                  <FormTRow
                    form={form}
                    count={
                      formsCount?.find((f) => f.msnv === form.msnv && f.loaidon === form.loaidon)
                        ?.count
                    }
                    key={form.id}
                  />
                );
              })}
            </tbody>
          </table>
          <div ref={ref} className="flex justify-center p-4">
            {isFetchingNextPage && <Spinner color="blue" fontSize={20} />}
          </div>
        </div>
      )}

      <div className="flex justify-between px-4 my-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded"
          onClick={() => {
            setSearchParams({
              month: prevMonth,
              ...(value && type ? { type, value } : {}),
            });
          }}
        >
          <ChevronsLeft />
          <span>{prevMonth}</span>
        </button>
        <button
          disabled={month === format(new Date(), "yyyy-MM")}
          className={`${month === format(new Date(), "yyyy-MM") ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white flex items-center gap-2 px-4 py-2 rounded`}
          onClick={() => {
            setSearchParams({
              month: nextMonth,
              ...(value && type ? { type, value } : {}),
            });
          }}
        >
          <span>{nextMonth}</span>
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}

export default FormsListComponent;
