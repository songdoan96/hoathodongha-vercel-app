import { Download, FileDown, FilePlus } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import routers from "~/lib/router";
import { HeaderComponent, HeaderRight, HeaderTitle } from "~/components/Header";
import FormListComponent from "~/components/Form/FormList";
import type { Route } from "./+types";
import { Input } from "~/components/ui/input";
import ENV_CONFIG from "~/lib/env";
import { useState } from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}

function OrganizationPage() {
  const [queryDate, setQueryDate] = useState<string>();

  function handleExportDate(queryDate?: string) {
    if (queryDate) {
      window.location.href = ENV_CONFIG.BACKEND_URL + "/form/organization/export?date=" + queryDate;
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
      <FormListComponent />
    </div>
  );
}

export default OrganizationPage;
