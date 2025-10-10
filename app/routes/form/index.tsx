import { FilePlus } from "lucide-react";
import { Link } from "react-router";
import FormListComponent from "~/components/Form/FormList";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import routers from "~/lib/router";
import type { Route } from "./+types";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}

function FormDashboard() {
  return (
    <div>
      <HeaderComponent>
        <HeaderTitle>Đơn nghỉ phép - ra cổng</HeaderTitle>
        {/* <HeaderRight><MenubarComponent />1</HeaderRight> */}
      </HeaderComponent>
      {/* <div className="text-center p-2 hidden">
        <p>
          <span className="font-bold">Bước 1:</span> Chọn loại đơn muốn tạo ⇒ điền thông tin
        </p>
        <p>
          <span className="font-bold">Bước 2:</span> Xin xác nhận của
          <span className="font-bold text-red-500"> TỔ TRƯỞNG</span> ⇒
          <span className="font-bold text-red-500"> QUẢN ĐỐC </span>⇒
          <span className="font-bold text-red-500"> LÃNH ĐẠO</span>
        </p>
        <span className="font-semibold text-red-500 uppercase">
          ### Lưu ý: Để chỉnh sửa hoặc xóa đơn vui lòng liên hệ TỔ CHỨC
        </span>
      </div> */}
      <div className="flex justify-center gap-4 my-2">
        <div>
          <Link
            to={routers.form.leaveCreate}
            className="btn bg-teal-600 hover:bg-teal-500 min-w-32 text-base uppercase"
          >
            <FilePlus />
            <span>Nghỉ phép</span>
          </Link>
        </div>
        <div>
          <Link
            to={routers.form.outCreate}
            className="btn bg-pink-600 hover:bg-pink-500 min-w-32 text-base uppercase"
          >
            <FilePlus />
            <span>Ra cổng</span>
          </Link>
        </div>
      </div>
      <FormListComponent />
    </div>
  );
}

export default FormDashboard;
