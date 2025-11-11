import { format } from "date-fns";
import { Download, FileDown } from "lucide-react";
import { useState } from "react";
import FormsListComponent from "~/components/Forms/List";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import configuration from "~/lib/configuration";
export function meta() {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}
export default function FormOrganizationPage() {
  const [queryDate, setQueryDate] = useState<string>();

  function handleExportDate(queryDate?: string) {
    if (queryDate) {
      window.location.href =
        configuration().BACKEND_URL + "/forms/organization/export?date=" + queryDate;
    }
  }
  return (
    <div>
      <HeaderComponent>
        <HeaderTitle>Tổ chức</HeaderTitle>
      </HeaderComponent>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-2 p-2 w-full">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="uppercase font-bold">Xuất theo ngày</h1>
            <Input
              style={{ width: 200 }}
              type="date"
              onChange={(e) => setQueryDate(e.target.value)}
              max={format(new Date(), "yyyy-MM-dd")}
            />
            <Button color="blue" onClick={() => handleExportDate(queryDate)}>
              <FileDown /> Xuất file
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="uppercase font-bold">Xuất theo tháng</h1>
            <Input
              style={{ width: 200 }}
              type="month"
              onChange={(e) => setQueryDate(e.target.value)}
              max={format(new Date(), "yyyy-MM")}
            />
            <Button color="blue" onClick={() => handleExportDate(queryDate)}>
              <FileDown /> Xuất file
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="inline-flex text-center font-semibold min-w-20 text-teal-100 bg-teal-500 hover:bg-teal-600 px-1 rounded"
            onClick={() => {
              handleExportDate("leave");
            }}
          >
            <Download /> Nghỉ phép
          </Button>
          <Button
            className="inline-flex text-center font-semibold min-w-20 text-pink-100 bg-pink-500 hover:bg-pink-600 px-1 rounded"
            onClick={() => {
              handleExportDate("goout");
            }}
          >
            <Download /> Ra cổng
          </Button>
        </div>
      </div>
      <FormsListComponent />
    </div>
  );
}
