import { FilePlus } from "lucide-react";
import { Link } from "react-router";
import routers from "~/lib/routers";

export default function FormButtonComponent() {
  return (
    <div className="flex justify-center gap-4 my-2">
      <div>
        <Link
          to={routers().forms.create.leave}
          className="btn bg-teal-600 hover:bg-teal-500 min-w-32 text-base uppercase"
        >
          <FilePlus />
          <span>Nghỉ phép</span>
        </Link>
      </div>
      <div>
        <Link
          to={routers().forms.create.out}
          className="btn bg-pink-600 hover:bg-pink-500 min-w-32 text-base uppercase"
        >
          <FilePlus />
          <span>Ra cổng</span>
        </Link>
      </div>
    </div>
  );
}
