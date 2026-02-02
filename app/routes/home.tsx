import { ClipboardPenLine, DollarSign, Signature } from "lucide-react";
import { Link } from "react-router";
import routers from "~/lib/routers";

export function meta() {
  return [
    { title: "Công ty may Hòa Thọ Đông Hà" },
    { name: "description", content: "Công ty may Hòa Thọ Đông Hà" },
  ];
}
function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <img src="/images/bg.JPG" alt="BG" className="absolute w-full h-full z-10" />
      <div className="w-full h-full z-20 absolute opacity-80 bg-black"></div>
      <div className="absolute z-30 w-full h-full text-white flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img src="/images/logo.png" alt="Logo" className="w-20" />
          <span className="uppercase text-3xl text-white font-bold flex flex-col text-center md:hidden">
            <span>Công ty may</span>
            <span>Hòa Thọ Đông Hà</span>
          </span>
          <span className="uppercase text-5xl text-white font-bold text-center hidden md:flex">
            Công ty may Hòa Thọ Đông Hà
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 uppercase text-xl text-center h-2/3">
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-20 h-20 flex justify-center items-center my-4">
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
            <div className="bg-blue-100 rounded-full p-2 w-20 h-20 flex justify-center items-center my-4">
              <Signature color="blue" size={30} className="" />
            </div>
            <Link
              to={routers().forms.signature}
              className="font-bold bg-blue-500 w-full inline-block my-1 py-2"
            >
              Duyệt đơn
            </Link>
          </div>
          <div className="bg-gray-50 min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded hidden">
            <div className="bg-blue-100 rounded-full p-2 w-20 h-20 flex justify-center items-center my-4">
              <DollarSign color="blue" size={30} className="" />
            </div>
            <Link to={"/luong"} className="font-bold bg-blue-500 w-full inline-block my-1 py-2">
              Tra cứu lương
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
