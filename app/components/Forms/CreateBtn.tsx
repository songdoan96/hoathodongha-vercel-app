import { ClipboardPlus, FilePlus } from "lucide-react";
import { Link } from "react-router";
import routers from "~/lib/routers";

export default function FormButtonComponent() {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 my-2 lg:max-w-xl mx-auto">
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
      <div className="flex justify-center items-center col-span-2 lg:col-span-1">
        <Link
          to={routers().overtime.dashboard}
          className="btn bg-orange-600 hover:bg-orange-500 max-w-32 text-base uppercase"
        >
          <ClipboardPlus />
          <span>Tăng ca</span>
        </Link>
      </div>
    </div>
  );
}
