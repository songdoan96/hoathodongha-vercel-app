import FormButtonComponent from "~/components/Forms/CreateBtn";
import FormsListComponent from "~/components/Forms/List";
import { HeaderComponent, HeaderTitle } from "~/components/Header";

export function meta() {
  return [
    { title: "Ký đơn nghỉ phép - ra cổng" },
    { name: "description", content: "Ký đơn nghỉ phép - ra cổng" },
  ];
}

function SignaturePage() {
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

export default SignaturePage;
