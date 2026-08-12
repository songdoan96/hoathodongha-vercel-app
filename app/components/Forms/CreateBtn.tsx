import { ClipboardPlus, FilePlus, Mail, Mails, Salad, Truck } from "lucide-react";
import { Link } from "react-router";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";

export default function FormButtonComponent() {
  const { user } = useAuthStore();
  console.log("🚀 ~ FormButtonComponent ~ user:", user);

  return (
    <div className="w-full flex flex-wrap lg:flex-nowrap justify-center items-center gap-2 lg:gap-6 my-2 lg:max-w-xl mx-auto">
      {!user ? (
        <>
          <div className="flex justify-center items-center w-1/2 lg:w-1/3">
            <Link
              to={routers().forms.create.leave}
              className="btn bg-teal-600 hover:bg-teal-500 min-w-40 text-base uppercase"
            >
              <FilePlus />
              <span>Nghỉ phép</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/2 lg:w-1/3">
            <Link
              to={routers().forms.create.out}
              className="btn bg-pink-600 hover:bg-pink-500 min-w-40 text-base uppercase"
            >
              <FilePlus />
              <span>Ra cổng</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/2 lg:w-1/3">
            <Link
              to={routers().goods.dashboard}
              className="btn bg-yellow-600 hover:bg-yellow-500 w-40 text-base uppercase"
            >
              <Truck />
              <span>Hàng ra cổng</span>
            </Link>
          </div>
        </>
      ) : user.bophan !== "lanhdao" && user.bophan !== "giamdoc" ? (
        <>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().forms.create.leave}
              className="btn bg-teal-600 hover:bg-teal-500 min-w-40 text-base uppercase"
            >
              <FilePlus />
              <span>Nghỉ phép</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().forms.create.out}
              className="btn bg-pink-600 hover:bg-pink-500 min-w-40 text-base uppercase"
            >
              <FilePlus />
              <span>Ra cổng</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().overtime.dashboard}
              className="btn bg-orange-600 hover:bg-orange-500 min-w-40 text-base uppercase"
            >
              <ClipboardPlus />
              <span>Tăng ca</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().meals.line}
              className="btn bg-cyan-600 hover:bg-cyan-500 min-w-40 text-base uppercase"
            >
              <Salad />
              <span>Ăn sáng</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().goods.dashboard}
              className="btn bg-yellow-600 hover:bg-yellow-500 w-40 text-base uppercase"
            >
              <Truck />
              <span>Hàng ra cổng</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().overtime.dashboard}
              className="btn bg-orange-600 hover:bg-orange-500 min-w-40 text-base uppercase"
            >
              <ClipboardPlus />
              <span>Tăng ca</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().meals.dashboard}
              className="btn bg-cyan-600 hover:bg-cyan-500 min-w-40 text-base uppercase"
            >
              <Salad />
              <span>Ăn sáng</span>
            </Link>
          </div>
          <div className="flex justify-center items-center w-1/3">
            <Link
              to={routers().feedback.dashboard}
              className="btn bg-yellow-600 hover:bg-yellow-500 text-base uppercase"
            >
              <Mail />
              <span>Hòm thư</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
