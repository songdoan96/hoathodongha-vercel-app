import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Mails } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { HeaderComponent, HeaderRight, HeaderTitle } from "~/components/Header";
import Loading from "~/components/Loading";
import apiClient from "~/lib/api-client";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";

export const apiFeedbackAll = async (): Promise<
  {
    id: number;
    content: string;
    createdAt: Date;
  }[]
> => {
  const { data } = await apiClient.get("/feedbacks");
  return data;
};

function dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data: feedbacks, isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: apiFeedbackAll,
  });
  useEffect(() => {
    if (user && user.bophan !== "admin" && user.bophan !== "lanhdao" && user.bophan !== "giamdoc") {
      navigate("/");
    }
  }, [user]);

  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div>
      <HeaderComponent>
        <HeaderTitle>Hòm thư góp ý điện tử</HeaderTitle>
        <HeaderRight>
          <Link title="Góp ý" to={routers().feedback.create}>
            <Mails size={30} />
          </Link>
        </HeaderRight>
      </HeaderComponent>
      <div className="overflow-x-auto max-w-5xl mt-2 mx-auto overflow-hidden">
        <table className="w-full border-collapse shadow-2xl overflow-hidden">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-2 border font-bold text-[#004494] uppercase text-lg w-12 lg:w-40 text-center">
                STT
              </th>
              <th className="p-2 border font-bold text-[#004494] uppercase text-lg w-12 lg:w-40 text-center">
                Ngày góp ý
              </th>
              <th className="p-2 border font-bold text-[#004494] uppercase text-lg text-center">
                Nội dung
              </th>
            </tr>
          </thead>
          <tbody>
            {feedbacks?.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-slate-700 italic">
                  Chưa có góp ý nào được ghi nhận.
                </td>
              </tr>
            ) : (
              feedbacks?.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="p-2 border text-slate-500 text-center font-semibold">
                    {index + 1}
                  </td>
                  <td className="p-2 border text-blue-600 text-center">
                    {format(item.createdAt, "dd/MM/yyyy")}
                  </td>
                  <td className="p-2 border text-slate-700">{item.content}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default dashboard;
