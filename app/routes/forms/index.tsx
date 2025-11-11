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
      <FormButtonComponent />
      <FormsListComponent />
    </div>
  );
}

export default FormDashboard;
