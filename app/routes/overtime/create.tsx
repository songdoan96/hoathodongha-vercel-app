import { useQuery } from "@tanstack/react-query";
import { apiOvertimeFindListInLine } from "~/apis/overtime.api";
import { HeaderComponent, HeaderRight, HeaderTitle } from "~/components/Header";
import OvertimeCreateForm from "~/components/Overtime/OvertimeCreateForm";
import OvertimeList from "~/components/Overtime/OvertimeList";
import { Skeleton } from "~/components/ui/skeleton";
import { QUERY_KEY } from "~/lib/queryKey";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { AuthType } from "~/types/auth.type";
import type { Route } from "./+types/create";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Tạo đơn tăng ca" }, { name: "description", content: "Tạo đơn tăng ca" }];
}
function OvertimeCreate() {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.overtime.FIND_LIST_IN_LINE, user?.bophan],
    queryFn: () => apiOvertimeFindListInLine(user?.bophan),
    enabled: !!user?.bophan,
  });
  return (
    <div className="w-full">
      <HeaderComponent>
        <HeaderTitle>
          Đăng ký tăng ca {linesList.find((line) => line.value === user?.bophan)?.name}
        </HeaderTitle>
        <HeaderRight>
          {/* <Link to={formRouter.kynhan} className="underline text-white font-bold">
            <ClipboardPen />
          </Link> */}
          {/* <MenubarComponent /> */}1
        </HeaderRight>
      </HeaderComponent>
      {/* <LineNavbar /> */}
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-wrap w-full p-2 gap-4">
          <div className="overflow-x-auto flex-1 min-h-[400px]">
            <h1 className="text-xl md:text-2xl font-bold uppercase text-center text-black">
              Danh sách tăng ca đã đăng ký
            </h1>
            {isLoading && <Skeleton className="h-[20px] w-[100px] rounded-full" />}
            {data?.overtimes && user && <OvertimeList overtimes={data.overtimes} user={user} />}
          </div>
          <div className="w-full md:w-1/3 order-2">
            <h1 className="text-xl md:text-2xl font-bold uppercase text-center text-black">
              Tạo đơn đăng ký tăng ca
            </h1>
            {isLoading && <Skeleton className="h-[20px] w-[100px] rounded-full" />}
            {data?.employees && user && (
              <OvertimeCreateForm employees={data.employees} user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OvertimeCreate;
