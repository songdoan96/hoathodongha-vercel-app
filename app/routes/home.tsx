import {
  ClipboardPenLine,
  ClipboardPlus,
  DollarSign,
  MailCheck,
  NotebookText,
  Salad,
  Signature,
  Truck,
} from "lucide-react";
import { Link } from "react-router";
import routers from "~/lib/routers";
import useAuthStore from "~/stores/auth-store";

export function meta() {
  return [
    { title: "Công ty may Hòa Thọ Đông Hà" },
    { name: "description", content: "Công ty may Hòa Thọ Đông Hà" },
  ];
}
function Home() {
  const { user } = useAuthStore();
  return (
    <div className="min-h-screen w-full relative">
      <img src="/images/bg.JPG" alt="BG" className="absolute w-full h-full z-10" />
      <div className="w-full h-full z-20 absolute opacity-80 bg-black"></div>
      {/* <div className="absolute z-30 w-full h-full text-white flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row items-center gap-4 p-2">
          <img src="/images/logo.png" alt="Logo" className="w-14 md:w-20" />
          <span className="uppercase text-2xl text-white font-bold flex flex-col text-center md:hidden">
            <span>Công ty may</span>
            <span>Hòa Thọ Đông Hà</span>
          </span>
          <span className="uppercase text-5xl text-white font-bold text-center hidden md:flex">
            Công ty may Hòa Thọ Đông Hà
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 uppercase text-xl text-center h-full md:h-2/3">
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
              <ClipboardPenLine color="blue" size={30} className="" />
            </div>
            <Link
              to={routers().forms.index}
              className="font-bold bg-blue-500 w-full inline-block my-1 py-2"
            >
              Tạo đơn
            </Link>
          </div>
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
              <Signature color="blue" size={30} className="" />
            </div>
            <Link
              to={routers().forms.signature}
              className="font-bold bg-blue-500 w-full inline-block my-1 py-2"
            >
              Duyệt đơn
            </Link>
          </div>
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
              <DollarSign color="blue" size={30} className="" />
            </div>
            <Link to={"/luong"} className="font-bold bg-blue-500 w-full inline-block my-1 py-2">
              Tra cứu lương
            </Link>
          </div>
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
              <ClipboardPlus color="blue" size={30} className="" />
            </div>
            <Link to={"/tangca"} className="font-bold bg-blue-500 w-full inline-block my-1 py-2">
              Tăng ca
            </Link>
          </div>
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
              <Salad color="blue" size={30} className="" />
            </div>
            <Link to={"/ansang"} className="font-bold bg-blue-500 w-full inline-block my-1 py-2">
              Ăn sáng
            </Link>
          </div>
          {user &&
          (user.bophan === "lanhdao" || user.bophan === "giamdoc" || user.bophan === "admin") ? (
            <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
              <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
                <MailCheck color="blue" size={30} className="" />
              </div>
              <Link
                to={routers().feedback.dashboard}
                className="font-bold bg-blue-500 w-full inline-block my-1 py-2"
              >
                Hòm thư góp ý
              </Link>
            </div>
          ) : (
            <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
              <div className="bg-blue-100 rounded-full p-2 w-10 h-10 md:w-20 md:h-20 flex justify-center items-center my-4">
                <MailCheck color="blue" size={30} className="" />
              </div>
              <Link
                to={routers().feedback.create}
                className="font-bold bg-blue-500 w-full inline-block my-1 py-2"
              >
                Hòm thư góp ý
              </Link>
            </div>
          )}
        </div>
      </div> */}
      <div className="z-30 absolute left-0 top-0 w-full h-full flex flex-col text-white">
        <div className="flex justify-center items-center w-full gap-8 p-2 md:pt-8">
          <img src="/images/logo.png" alt="Logo" className="w-16" />
          <span className="uppercase text-2xl text-white font-bold flex flex-col text-center md:hidden">
            <span>Công ty may</span>
            <span>Hòa Thọ Đông Hà</span>
          </span>
          <span className="uppercase text-5xl text-white font-bold text-center hidden md:flex">
            Công ty may Hòa Thọ Đông Hà
          </span>
        </div>
        <div className="flex lg:h-3/5 lg:w-2/3 md:mx-auto my-auto justify-center items-center flex-wrap px-2 text-center uppercase overflow-y-auto">
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={routers().forms.index}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <ClipboardPenLine color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">Tạo đơn</p>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={routers().forms.signature}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <Signature color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">Duyệt đơn</p>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={"/luong"}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <DollarSign color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">
                Tra cứu lương
              </p>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={"/tangca"}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <ClipboardPlus color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">Tăng ca</p>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={"/hanghoa"}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <Truck color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">
                Hàng hóa ra cổng
              </p>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={"/ansang"}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <Salad color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">Ăn sáng</p>
            </Link>
          </div>
          {user &&
          (user.bophan === "lanhdao" || user.bophan === "giamdoc" || user.bophan === "admin") ? (
            <div className="w-1/2 md:w-1/4 p-2">
              <Link
                to={routers().feedback.dashboard}
                className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
              >
                <div className="h-3/4 flex justify-center items-center my-auto">
                  <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                    <MailCheck color="blue" className="w-10 h-10" />
                  </div>
                </div>
                <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">
                  Hòm thư góp ý
                </p>
              </Link>
            </div>
          ) : (
            <div className="w-1/2 md:w-1/4 p-2">
              <Link
                to={routers().feedback.create}
                className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
              >
                <div className="h-3/4 flex justify-center items-center my-auto">
                  <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                    <MailCheck color="blue" className="w-10 h-10" />
                  </div>
                </div>
                <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">
                  Hòm thư góp ý
                </p>
              </Link>
            </div>
          )}
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to={"/chinhsach"}
              className="bg-gray-50 min-h-32 border-2 border-orange-600 flex flex-col justify-center items-center rounded-xl overflow-hidden"
            >
              <div className="h-3/4 flex justify-center items-center my-auto">
                <div className="bg-blue-100 h-16 w-16 rounded-full flex justify-center items-center">
                  <NotebookText color="blue" className="w-10 h-10" />
                </div>
              </div>
              <p className="font-bold bg-blue-500 w-full inline-block py-2 mt-auto">
                Chính sách LĐ
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
