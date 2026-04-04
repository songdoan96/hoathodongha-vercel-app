import { LucidePhoneCall, Phone } from "lucide-react";
import FormButtonComponent from "~/components/Forms/CreateBtn";
import FormsListComponent from "~/components/Forms/List";
import { HeaderComponent, HeaderTitle } from "~/components/Header";

export function meta() {
  return [
    { title: "Tạo đơn nghỉ phép - ra cổng" },
    { name: "description", content: "Tạo đơn nghỉ phép - ra cổng" },
  ];
}

function FormDashboard() {
  return (
    <div>
      <HeaderComponent>
        <HeaderTitle>Đơn nghỉ phép - ra cổng</HeaderTitle>
      </HeaderComponent>
      <div className="p-2">
        <div className="w-full flex-col lg:grid lg:grid-cols-5 lg:gap-2">
          <div className="flex items-center uppercase border-blue-600 border">
            <p className="bg-blue-100 text-blue-700 font-semibold p-2 py-0.5 w-1/2">QĐX1 - Lương</p>
            <p className="text-blue-700 p-2 py-0.5">0905.492.552</p>
          </div>
          <div className="flex items-center uppercase border-blue-600 border">
            <p className="bg-blue-100 text-blue-700 font-semibold p-2 py-0.5 w-1/2">QĐX2 - Liên</p>
            <p className="text-blue-700 p-2 py-0.5">0908.849.698</p>
          </div>
          <div className="flex items-center uppercase border-blue-600 border">
            <p className="bg-blue-100 text-blue-700 font-semibold p-2 py-0.5 w-1/2">PGĐ - Diệp</p>
            <p className="text-blue-700 p-2 py-0.5">0914.993.234</p>
          </div>
          <div className="flex items-center uppercase border-blue-600 border">
            <p className="bg-blue-100 text-blue-700 font-semibold p-2 py-0.5 w-1/2">TPTC - TRUNG</p>
            <p className="text-blue-700 p-2 py-0.5">0935.857.868</p>
          </div>
          <div className="flex items-center uppercase border-blue-600 border">
            <p className="bg-blue-100 text-blue-700 font-semibold p-2 py-0.5 w-1/2">TPKT - OANH</p>
            <p className="text-blue-700 p-2 py-0.5">0934.860.678</p>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-3 gap-2 uppercase p-2 md:w-3/4 md:grid-cols-5 mx-auto">
        <div className="flex flex-col text-center border rounded-sm">
          <p className="bg-blue-200 font-semibold p-1">QĐX1 - Lương</p>
          <p className="text-blue-700">0905.492.552</p>
        </div>
        <div className="flex flex-col text-center border rounded-sm">
          <p className="bg-blue-200 font-semibold p-1"> QĐX2 - Liên</p>
          <p className="text-blue-700">0908.849.698</p>
        </div>
        <div className="flex flex-col text-center border rounded-sm">
          <p className="bg-blue-200 font-semibold p-1">PGĐ - Diệp</p>
          <p className="text-blue-700">0914.993.234</p>
        </div>
        <div className="flex flex-col text-center border rounded-sm">
          <p className="bg-blue-200 font-semibold p-1">TPTC - TRUNG</p>
          <p className="text-blue-700">0935.857.868</p>
        </div>
        <div className="flex flex-col text-center border rounded-sm">
          <p className="bg-blue-200 font-semibold p-1">TPKT - OANH</p>
          <p className="text-blue-700">0934.860.678</p>
        </div>
      </div> */}
      <FormButtonComponent />

      <FormsListComponent />
    </div>
  );
}

export default FormDashboard;
