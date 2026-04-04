import { ClipboardPlus, FilePlus, Salad } from "lucide-react";
import { Link } from "react-router";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";

export default function FormButtonComponent() {
  const { user } = useAuthStore();
  return (
    <div
      className={`w-full grid grid-cols-2 gap-2 my-2 lg:max-w-xl mx-auto ${user ? "lg:grid-cols-4" : ""}`}
    >
      <div className="flex justify-center items-center">
        <Link
          to={routers().forms.create.leave}
          className="btn bg-teal-600 hover:bg-teal-500 max-w-32 text-base uppercase"
        >
          <FilePlus />
          <span>Nghỉ phép</span>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={routers().forms.create.out}
          className="btn bg-pink-600 hover:bg-pink-500 max-w-32 text-base uppercase"
        >
          <FilePlus />
          <span>Ra cổng</span>
        </Link>
      </div>
      {user && (
        <div className="flex justify-center items-center">
          <Link
            to={routers().overtime.dashboard}
            className="btn bg-orange-600 hover:bg-orange-500 max-w-32 text-base uppercase"
          >
            <ClipboardPlus />
            <span>Tăng ca</span>
          </Link>
        </div>
      )}
      {user && user.bophan !== "lanhdao" && user?.bophan !== "giamdoc" ? (
        <div className="flex justify-center items-center">
          <Link
            to={routers().meals.line}
            className="btn bg-cyan-600 hover:bg-cyan-500 max-w-32 text-base uppercase"
          >
            <Salad />
            <span>Ăn sáng</span>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Link
            to={routers().meals.dashboard}
            className="btn bg-cyan-600 hover:bg-cyan-500 max-w-32 text-base uppercase"
          >
            <Salad />
            <span>Ăn sáng</span>
          </Link>
        </div>
      )}
    </div>
  );
}
