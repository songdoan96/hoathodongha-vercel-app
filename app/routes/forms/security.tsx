import FormSecurityListComponent from "~/components/Forms/Security";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import routers from "~/lib/routers";
export function meta() {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}

function FormDashboard() {
  return (
    <div>
      <HeaderComponent logoLink={routers().forms.security}>
        <HeaderTitle>Bảo vệ xác nhận ra cổng</HeaderTitle>
      </HeaderComponent>
      <FormSecurityListComponent />
    </div>
  );
}

export default FormDashboard;
