import { HeaderComponent, HeaderTitle } from "~/components/Header";
import type { Route } from "./+types/detail";
import { Link, useSearchParams } from "react-router";
import { format, formatDate } from "date-fns";
import { useFormsEmployeeDetail } from "~/hooks/forms-hook";
import Loading from "~/components/Loading";
import { linesList } from "~/lib/variables";
import { ChevronsRight, History } from "lucide-react";
import routers from "~/lib/routers";
export function meta() {
  return [{ title: "Chi tiết nhân viên" }, { name: "description", content: "Chi tiết nhân viên" }];
}
// export async function loader({ params }: Route.LoaderArgs) {
//   return params.msnv;
// }
export default function DetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month");
  const msnv = searchParams.get("msnv");
  if (!month || !msnv) {
    return null;
  }
  const { data: forms, isLoading } = useFormsEmployeeDetail(month, msnv);
  if (isLoading) {
    return <Loading fullScreen />;
  }
  const leaves = forms?.filter((form) => form.loaidon === "leave");
  const outs = forms?.filter((form) => form.loaidon === "out");

  if (forms) {
    return (
      <div className="bg-gray-200 h-screen w-screen">
        <Link to={routers().forms.index} className="w-full flex justify-center items-center py-2">
          <img src="/images/logo.png" alt="" className="w-16" />
        </Link>
        <div className="md:grid md:grid-cols-2 gap-4 p-2 md:p-4">
          <div className="">
            <div className="border rounded overflow-hidden shadow-xl bg-white gap-2 uppercase font-bold text-xl h-full p-4 flex flex-col justify-between">
              <div className="flex">
                <span className="w-1/3 text-blue-700">Họ tên</span>
                <span>: {forms[0].hoten}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 text-blue-700">Tổ</span>
                <span>: {linesList.find((line) => line.value === forms[0].to)?.name}</span>
              </div>
              <div className="flex">
                <span className="w-1/3 text-blue-700">MSNV</span>
                <span>: {forms[0].msnv}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="border rounded-xl overflow-hidden shadow-xl bg-white">
                <p className="flex justify-center items-center text-7xl font-black py-2 text-teal-700">
                  {leaves?.length}
                </p>
                <p className="bg-teal-500 uppercase text-white text-xl text-center font-bold py-2">
                  Nghỉ phép
                </p>
              </div>
              <div className="border rounded-xl overflow-hidden shadow-xl bg-white">
                <p className="flex justify-center items-center text-7xl font-black py-2 text-pink-700">
                  {outs?.length}
                </p>
                <p className="bg-pink-500 uppercase text-white text-xl text-center font-bold py-2">
                  Ra cổng
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full bg-white text-black text-center">
            <thead className="uppercase">
              <tr>
                <th className="border border-black bg-[#27AE60] text-white">Ngày</th>
                <th className="border border-black bg-[#27AE60] text-white min-w-28">Loại đơn</th>
                <th className="border border-black bg-[#27AE60] text-white min-w-32">Thời gian</th>
                <th className="border border-black bg-[#27AE60] text-white min-w-28">Lý do</th>
                <th className="border border-black bg-[#27AE60] text-white">Giờ ra-vào</th>
              </tr>
            </thead>
            <tbody>
              {leaves?.map((form) => (
                <tr key={form.id}>
                  <td className="border border-black text-center font-bold">
                    {format(form.ngaytao, "dd/MM")}
                  </td>
                  <td className="border border-black text-center">
                    <span className="inline-block text-center font-semibold min-w-20 text-teal-100 bg-teal-500 p-1 rounded">
                      Nghỉ phép
                    </span>
                  </td>
                  <td className="border border-black text-center">
                    <div className="text-center">
                      <p className="font-bold text-teal-500">{form.songaynghi} ngày</p>
                      <p>
                        ( {form.tungay && formatDate(form.tungay, "dd/MM")} -
                        {form.denngay && formatDate(form.denngay, "dd/MM")} )
                      </p>
                    </div>
                  </td>
                  <td className="border border-black text-center">{form.lydo}</td>
                  <td className="border border-black text-center"></td>
                </tr>
              ))}
              {outs?.map((form) => (
                <tr key={form.id}>
                  <td className="border border-black text-center font-bold">
                    {format(form.ngaytao, "dd/MM")}
                  </td>
                  <td className="border border-black text-center">
                    <span className="inline-block text-center font-semibold min-w-20 text-pink-100 bg-pink-500 p-1 rounded">
                      Ra cổng
                    </span>
                  </td>
                  <td className="border border-black text-center">
                    <div className="text-center">
                      <p className="font-bold text-pink-500">{`${form.tugio} - ${form.dengio}`}</p>
                      <p>(ngày {form.rangay && formatDate(form.rangay, "dd/MM")})</p>
                    </div>
                  </td>
                  <td className="border border-black text-center">{form.lydo}</td>
                  <td className="border border-black text-center p-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-blue-500 font-bold">
                        {form.giora || <History color="red" size={18} />}
                      </span>
                      <ChevronsRight size={14} />
                      <span className="text-blue-500 font-bold">
                        {form.giovao || <History color="red" size={18} />}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
