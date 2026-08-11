import { useQueryClient } from "@tanstack/react-query";
import { Truck } from "lucide-react";
import { Link } from "react-router";
import FormSecurityListComponent from "~/components/Forms/Security";
import { HeaderComponent, HeaderRight, HeaderTitle } from "~/components/Header";
import { FORMS_QUERY_KEY } from "~/hooks/forms-hook";
import routers from "~/lib/routers";
export function meta() {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}

function FormDashboard() {
  const queryClient = useQueryClient();
  return (
    <div>
      <HeaderComponent
        logoLink={routers().forms.security}
        handleClick={() => queryClient.invalidateQueries({ queryKey: [FORMS_QUERY_KEY.SECURITY] })}
      >
        <HeaderTitle>Bảo vệ xác nhận ra cổng</HeaderTitle>
        <HeaderRight>
          <Link to={routers().goods.security}>
            <Truck />
          </Link>
        </HeaderRight>
      </HeaderComponent>
      <FormSecurityListComponent />
    </div>
  );
}

export default FormDashboard;
