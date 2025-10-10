import FormSecurityListComponent from "~/components/Form/FormSecurityList";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import type { Route } from "./+types";
import routers from "~/lib/router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}

function FormDashboard() {
  return (
    <div>
      <HeaderComponent logoLink={routers.form.security}>
        <HeaderTitle>Bảo vệ xác nhận ra cổng</HeaderTitle>
      </HeaderComponent>
      <FormSecurityListComponent />
    </div>
  );
}

export default FormDashboard;
