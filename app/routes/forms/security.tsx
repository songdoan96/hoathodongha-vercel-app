import { useQueryClient } from "@tanstack/react-query";
import { Truck } from "lucide-react";
import { Link, useLocation } from "react-router";
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
  const location = useLocation();
  return (
    <div>
      <HeaderComponent
        logoLink={routers().forms.security}
        handleClick={() =>
          queryClient.invalidateQueries({
            queryKey: [FORMS_QUERY_KEY.SECURITY],
          })
        }
      >
        <HeaderTitle>Bảo vệ xác nhận ra cổng</HeaderTitle>
        <HeaderRight>
          <Link
            to={routers().guestFlow.add}
            state={{ from: location.pathname }}
          >
            <Truck size={32} />
          </Link>
        </HeaderRight>
      </HeaderComponent>
      <div className="flex p-2 gap-2">
        <div className="w-1/4 grid grid-cols-2 gap-2">
          <div className="border border-(--primary-bg) rounded text-center flex">
            <h6 className="uppercase text-xl">đang ở nhà máy</h6>
          </div>
          <div className="border border-(--primary-bg) rounded text-center flex">
            <h6 className="uppercase text-xl"> đã về</h6>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-xl dark:bg-gray-800">
          <div className="flex overflow-x-auto">
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
            <div className="flex-none px-3 py-6 border">
              <div className="flex">
                <strong className="text-xs font-medium text-gray-900 dark:text-gray-200">
                  Khách Motives
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormSecurityListComponent />
    </div>
  );
}

export default FormDashboard;
