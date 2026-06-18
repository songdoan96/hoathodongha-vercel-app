import { useFormsSecurity, useFormsSecurityUpdate } from "~/hooks/forms-hook";
import type { FormsType } from "~/types/forms-type";
import Loading from "../Loading";
import FormSecurityRowComponent from "./SecurityRow";

export default function FormSecurityListComponent() {
  const { data, isLoading } = useFormsSecurity();
  const update = useFormsSecurityUpdate();

  if (isLoading || update.isPending) return <Loading fullScreen />;
  return (
    <div className="">
      {data && (
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
              {data.map((form: FormsType) => (
                <FormSecurityRowComponent key={form.id} form={form} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
