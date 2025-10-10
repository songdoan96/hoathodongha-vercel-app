import { useQuery } from "@tanstack/react-query";
import { EditIcon, FilePlus, Trash } from "lucide-react";
import { Link } from "react-router";
import { apiAuthFindAll } from "~/apis/auth.api";
import Loading from "~/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { QUERY_KEY } from "~/lib/queryKey";
import routers from "~/lib/router";
import type { AuthType } from "~/types/auth.type";
import type { Route } from "./+types/dashboard";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tài khoản tổ trưởng" },
    { name: "description", content: "Tài khoản tổ trưởng" },
  ];
}

function UserDashboard() {
  const { deleteMutation } = useAuth();
  const { data, isPending } = useQuery<AuthType[]>({
    queryKey: [QUERY_KEY.auth.GET_USERS],
    queryFn: apiAuthFindAll,
  });
  if (isPending) {
    return <Loading fullScreen />;
  }
  return (
    <div className="flex flex-col p-4">
      <div className="flex mb-4">
        <span className="font-bold w-full text-2xl uppercase flex justify-center items-center text-blue-500">
          Tổ trưởng
        </span>
        <Link
          to={routers.auth.add}
          className="btn bg-teal-600 hover:bg-teal-500 min-w-32 text-base uppercase"
        >
          <FilePlus />
          <span>Tài khoản</span>
        </Link>
      </div>
      {data && (
        <table className="text-left">
          <thead>
            <tr>
              <th className="border p-1 px-2 bg-teal-300">STT</th>
              <th className="border p-1 px-2 bg-teal-300">Username</th>
              <th className="border p-1 px-2 bg-teal-300">Name</th>
              <th className="border p-1 px-2 bg-teal-300">Password</th>
              <th className="border p-1 px-2 bg-teal-300">Bộ phận</th>
              <th className="border p-1 px-2 bg-teal-300"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id}>
                <td className="border p-1 px-2">
                  <Link
                    to={`/users/chinh-sua/${user.id}`}
                    className="text-blue-500 underline font-bold"
                  >
                    {++index}
                  </Link>
                </td>
                <td className="border p-1 px-2">{user.username}</td>
                <td className="border p-1 px-2">{user.name}</td>
                <td className="border p-1 px-2">{user.password}</td>
                <td className="border p-1 px-2">{user.bophan}</td>
                <td className="border p-1">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/users/chinh-sua/${user.id}`}
                      className="text-blue-500 underline font-bold"
                    >
                      <EditIcon color="blue" />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <Trash color="red" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
                          <AlertDialogDescription />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => deleteMutation.mutate(user.id)}
                          >
                            Xóa
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDashboard;
