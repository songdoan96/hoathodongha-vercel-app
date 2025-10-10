import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { ChevronsRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { apiFormSecurityGetGoOut, apiFormUpdate } from "~/apis/form.api";
import { QUERY_KEY } from "~/lib/queryKey";
import { linesList } from "~/lib/variables";
import type { FormType } from "~/types/form.type";
import Loading from "../Loading";
import TableEmpty from "../TableEmpty";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import "./form.css";

export default function FormSecurityListComponent() {
  const [gio, setGio] = useState<string>();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<FormType[]>({
    queryKey: [QUERY_KEY.form.SECURITY_GET_GOOUT],
    queryFn: apiFormSecurityGetGoOut,
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, values }: { id: string; values: Partial<FormType> }) =>
      apiFormUpdate(id, values),
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.form.SECURITY_GET_GOOUT] });
      // navigate(routers.form.index);
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });

  if (isLoading || mutationUpdate.isPending) return <Loading fullScreen />;
  return (
    <div className="">
      {data?.length ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 shadow-2xl">
            <thead className="text-white uppercase bg-[#27AE60]">
              <tr>
                <th scope="col" className="p-2 border border-black text-center">
                  Họ tên
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Tổ
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  MSNV
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Ngày ra
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Ra từ
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Lý do
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Tổ trưởng
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Quản đốc
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Lãnh đạo
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Giờ ra
                </th>
                <th scope="col" className="p-2 border border-black text-center">
                  Giờ vào
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((form: FormType) => {
                const needToTruong = linesList.find((line) => line.value === form.to)?.needToTruong;
                const needQuanDoc = linesList.find((line) => line.value === form.to)?.needQuanDoc;

                return (
                  <tr key={form.id} className="bg-white" title={`${form.id}`}>
                    <td className="p-2 border border-black text-left font-bold bg-white md:bg-transparent sticky left-0 min-w-16">
                      {form.hoten}
                    </td>
                    <td className="p-2 border border-black bg-white md:bg-transparent sticky left-16 min-w-12 text-center">
                      {linesList.find((line) => line.value == form.to)?.name}
                    </td>
                    <td className="p-2 border border-black text-center">{form.msnv}</td>
                    <td className="p-2 border border-black text-center text-red-500 font-bold">
                      {form.rangay && formatDate(form.rangay, "dd/MM")}
                    </td>
                    <td className="p-2 border border-black text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-blue-500 font-bold">{form.tugio}</span>
                        <ChevronsRight size={14} />
                        <span className="text-blue-500 font-bold">{form.dengio}</span>
                      </div>
                    </td>
                    <td className="p-2 border border-black text-center">{form.lydo}</td>
                    <td className="p-2 border border-black text-center">
                      <div className="flex justify-center items-center">
                        {!form.totruong && needToTruong && <X color="red" size={20} />}
                        {form.totruong}
                      </div>
                    </td>
                    <td className="p-2 border border-black text-center">
                      <div className="flex justify-center items-center">
                        {!form.quandoc && needQuanDoc && <X color="red" size={20} />}
                        {form.quandoc}
                      </div>
                    </td>
                    <td className="p-2 border border-black text-center">
                      <div className="flex justify-center items-center">
                        {!form.lanhdao && <X color="red" size={20} />}
                        {form.lanhdao}
                      </div>
                    </td>
                    <td className="p-2 border border-black text-center">
                      {form.giora ? (
                        form.giora
                      ) : (
                        <div className="flex gap-1">
                          <Input
                            type="time"
                            className="w-28"
                            onChange={(e) => setGio(e.target.value)}
                          />
                          <Button
                            className="p-2"
                            onClick={() => {
                              mutationUpdate.mutate({
                                id: form.id.toString(),
                                values: {
                                  giora: gio,
                                },
                              });
                            }}
                          >
                            Cập nhật
                          </Button>
                        </div>
                      )}
                    </td>
                    <td className="p-2 border border-black text-center">
                      {form.giovao ? (
                        form.giovao
                      ) : (
                        <div className="flex gap-1">
                          <Input
                            type="time"
                            className="w-28"
                            onChange={(e) => setGio(e.target.value)}
                          />
                          <Button
                            className="p-2"
                            onClick={() => {
                              mutationUpdate.mutate({
                                id: form.id.toString(),
                                values: {
                                  giovao: gio,
                                },
                              });
                            }}
                          >
                            Cập nhật
                          </Button>
                        </div>
                      )}
                    </td>
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
    </div>
  );
}
