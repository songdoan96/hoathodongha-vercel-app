import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMonths, format, formatDate, subMonths } from "date-fns";
import {
  CheckCircle,
  ChevronsLeft,
  ChevronsRight,
  CircleXIcon,
  FilterIcon,
  FilterX,
  History,
  Search,
  SearchX,
  Square,
  SquareCheck,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { apiFormDelete, apiFormGetAll, apiFormUpdate } from "~/apis/form.api";
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import { checkRole } from "~/lib/utils";
import { linesList, linesListFilter } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { FormType } from "~/types/form.type";
import Loading from "../Loading";
import TableEmpty from "../TableEmpty";
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
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import "./form.css";
import FormTT from "./FormTT";

function FormListComponent() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [searchType, setSearchType] = useState<string>("");
  const [searchLine, setSearchLine] = useState<string>("");
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"));
  const [searchMSNV, setSearchMSNV] = useState<string>("");
  const { data, isLoading } = useQuery<FormType[]>({
    queryKey: [QUERY_KEY.form.GET_ALL, searchType, searchLine],
    queryFn: () => apiFormGetAll(searchType, searchLine),
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<FormType> }) =>
      apiFormUpdate(id, values),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.form.GET_ALL] });
      // navigate(routers.form.index);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });
  const mutationDelete = useMutation({
    mutationFn: (id: string) => apiFormDelete(id),
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.form.GET_ALL] });
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });

  function handleUpdateStatus(id: string, chuaxong: any) {
    if (id) {
      mutationUpdate.mutate({ id, values: { chuaxong: !chuaxong } });
    }
  }
  function handleDelete(id: string) {
    if (id) {
      mutationDelete.mutate(id);
    }
  }

  if (isLoading) return <Loading fullScreen />;
  return (
    <div className="">
      {data?.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 shadow-2xl">
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
                    {searchType === "to" ? (
                      <FilterX
                        className="ml-2 cursor-pointer"
                        color="red"
                        size={18}
                        onClick={() => {
                          setSearchType("");
                          setSearchLine("");
                        }}
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
                                onClick={() => {
                                  setSearchType("to");
                                  setSearchLine(line.value);
                                }}
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
                    {searchType === "msnv" ? (
                      <SearchX
                        className="cursor-pointer"
                        color="red"
                        size={18}
                        onClick={() => {
                          setSearchMSNV("");
                          setSearchType("");
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
                                  setSearchType("");
                                }}
                              >
                                Hủy
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  setSearchType("msnv");
                                  setSearchLine(searchMSNV || "");
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
              {data.map((form: FormType) => {
                const needToTruong = linesList.find((line) => line.value === form.to)?.needToTruong;
                const needQuanDoc = linesList.find((line) => line.value === form.to)?.needQuanDoc;

                return (
                  <tr
                    key={form.id}
                    className={
                      form.chuaxong && checkRole("tochuc") ? "bg-red-100 z-50" : "bg-white"
                    }
                  >
                    <td className="p-1 border border-black text-center" title={`${form.id}`}>
                      {checkRole("tochuc") ? (
                        <Link className="underline font-bold" to={routers.form.edit(form.id)}>
                          {format(form.ngaytao, "dd/MM")}
                        </Link>
                      ) : (
                        <>{format(form.ngaytao, "dd/MM")}</>
                      )}
                    </td>
                    <td className="p-1 border border-black bg-white md:bg-transparent sticky left-0 min-w-16">
                      {form.hoten}
                    </td>
                    <td className="p-1 border border-black bg-white md:bg-transparent sticky left-16 min-w-12 text-center">
                      {linesList.find((line) => line.value == form.to)?.name}
                    </td>
                    <td className="p-1 border border-black text-center">{form.msnv}</td>
                    <td className="p-1 border border-black">
                      <div className="flex justify-center items-center">
                        {form.loaidon === "leave" ? (
                          <Link
                            to={routers.form.view(form.id)}
                            className="inline-block text-center font-semibold min-w-20 text-teal-100 bg-teal-500 p-1 rounded"
                          >
                            Nghỉ phép
                          </Link>
                        ) : (
                          <Link
                            to={routers.form.view(form.id)}
                            className="inline-block text-center font-semibold min-w-20 text-pink-100 bg-pink-500 p-1 rounded"
                          >
                            Ra cổng
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="p-1 border border-black min-w-28">
                      {form.loaidon == "leave" ? (
                        <div className="text-center">
                          <p className="font-bold text-teal-500">{form.songaynghi} ngày</p>
                          <p>
                            ( {form.tungay && formatDate(form.tungay, "dd/MM")} -
                            {form.denngay && formatDate(form.denngay, "dd/MM")} )
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="font-bold text-pink-500">{`${form.tugio} - ${form.dengio}`}</p>
                          <p>(ngày {form.rangay && formatDate(form.rangay, "dd/MM")})</p>
                        </div>
                      )}
                    </td>
                    <td className="p-1 border border-black">{form.lydo}</td>
                    <td className="p-1 border border-black">
                      <div className="flex justify-center items-center">
                        {form.thaythe ? <CheckCircle color="green" /> : <CircleXIcon color="red" />}
                      </div>
                    </td>
                    <td className="p-1 border border-black max-w-36">
                      <div className="flex items-center justify-center">
                        {form.totruong ? (
                          form.totruong
                        ) : (
                          <>
                            {!form.totruong && needToTruong && <X color="red" size={20} />}
                            {user && user.bophan === form.to && (
                              <FormTT mutationUpdate={mutationUpdate} user={user} form={form} />
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-1 border border-black">
                      <div className="flex items-center justify-center">
                        {!form.quandoc && needQuanDoc && <X color="red" size={20} />}
                        {form.quandoc
                          ? form.quandoc
                          : user &&
                            user.bophan === "quandoc" &&
                            ((needToTruong && needQuanDoc && form.totruong) ||
                              (!needToTruong && needQuanDoc)) && (
                              <Button
                                className="underline"
                                onClick={() =>
                                  mutationUpdate.mutate({
                                    id: form.id.toString(),
                                    values: {
                                      quandoc: user.name,
                                    },
                                  })
                                }
                                variant="link"
                              >
                                Ký đơn
                              </Button>
                            )}
                      </div>
                    </td>
                    <td className="p-1 border border-black">
                      <div className="flex items-center justify-center">
                        {!form.lanhdao && <X color="red" size={20} />}
                        {form.lanhdao
                          ? form.lanhdao
                          : user &&
                            user.bophan === "lanhdao" &&
                            ((!needToTruong && !needQuanDoc) ||
                              (needToTruong && needQuanDoc && form.quandoc) ||
                              (needToTruong && !needQuanDoc && form.totruong) ||
                              (!needToTruong && needQuanDoc && form.quandoc)) && (
                              <Button
                                className="underline"
                                onClick={() =>
                                  mutationUpdate.mutate({
                                    id: form.id.toString(),
                                    values: {
                                      lanhdao: user.name,
                                    },
                                  })
                                }
                                variant="link"
                              >
                                Ký đơn
                              </Button>
                            )}
                      </div>
                    </td>
                    <td className="p-1 border border-black">
                      {form.loaidon === "out" && (
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-blue-500 font-bold">
                            {form.giora || <History color="red" size={18} />}
                          </span>
                          <ChevronsRight size={14} />
                          <span className="text-blue-500 font-bold">
                            {form.giovao || <History color="red" size={18} />}
                          </span>
                        </div>
                      )}
                    </td>
                    {checkRole("tochuc") && (
                      <td className="p-1 border border-black">
                        <div className="flex justify-center items-center gap-1">
                          {form.chuaxong ? (
                            <Square
                              onClick={() => handleUpdateStatus(form.id.toString(), form.chuaxong)}
                              color="red"
                              size={20}
                              className="cursor-pointer"
                            />
                          ) : (
                            <SquareCheck
                              onClick={() => handleUpdateStatus(form.id.toString(), form.chuaxong)}
                              color="green"
                              size={20}
                              className="cursor-pointer"
                            />
                          )}
                          <button
                            onClick={() => {
                              if (confirm("Xác nhận xóa?")) {
                                handleDelete(form.id.toString());
                              }
                            }}
                          >
                            <Trash2 color="red" size={20} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-10">
          <TableEmpty />
        </div>
      )}
      <div className="flex justify-center items-center gap-2 py-2 mt-auto">
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-500 !px-2"
          onClick={() => {
            const monthValue = format(subMonths(new Date(month), 1), "yyyy-MM");
            setMonth(monthValue);
            // setSearch({
            //   type: "ngaytao",
            //   value: monthValue,
            // });
            setSearchType("ngaytao");
            setSearchLine(monthValue);
          }}
        >
          <span className="flex items-center gap-2">
            <ChevronsLeft size={20} />
            <span>T{format(subMonths(new Date(month), 1), "MM/yyyy")}</span>
          </span>
        </Button>
        <span className="text-blue-600 font-bold underline underline-offset-4">
          {format(new Date(month), "MM/yyyy")}
        </span>
        <Button
          disabled={month == format(new Date(), "yyyy-MM")}
          // asChild
          className="bg-blue-600 hover:bg-blue-500 !px-2"
          onClick={() => {
            const monthValue = format(addMonths(new Date(month), 1), "yyyy-MM");
            setMonth(monthValue);
            // setSearch({
            //   type: "ngaytao",
            //   value: monthValue,
            // });
            setSearchType("ngaytao");
            setSearchLine(monthValue);
          }}
        >
          <span className="flex items-center gap-2">
            <span>T{format(addMonths(new Date(month), 1), "MM/yyyy")}</span>
            <ChevronsRight size={20} />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default FormListComponent;
