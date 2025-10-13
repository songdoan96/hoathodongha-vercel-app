import { Link } from "react-router";
import type { Route } from "./+types/home";
import { ClipboardPenLine, Signature } from "lucide-react";

export function meta({}: Route.MetaArgs) {
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
          <span className="uppercase text-2xl md:text-5xl text-white font-bold text-center">
            Công ty may Hòa Thọ Đông Hà
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 uppercase text-xl text-center h-2/3">
          <div className="bg-white min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-20 h-20 flex justify-center items-center my-4">
              <ClipboardPenLine color="blue" size={30} className="" />
            </div>
            <Link to={`/tao-don`} className="font-bold bg-blue-500 w-full inline-block my-1 py-2">
              Tạo đơn
            </Link>
          </div>
          <div className="bg-white min-w-52 border-2 border-orange-600 flex flex-col justify-center items-center rounded">
            <div className="bg-blue-100 rounded-full p-2 w-20 h-20 flex justify-center items-center my-4">
              <Signature color="blue" size={30} className="" />
            </div>
            <Link to={`/ky-nhan`} className="font-bold bg-blue-500 w-full inline-block my-1 py-2">
              Duyệt đơn
            </Link>
          </div>

          {/* <Link
            to="/sanxuat"
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Thông tin sản xuất
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/nguyenlieu`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Nguyên liệu
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/phulieu`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Phụ liệu
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/tocat`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Tổ cắt
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/hoanthanh`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Hoàn thành
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/ky-thuat`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Phòng Kỹ thuật
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/kcs/home`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            KCS
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/noibo`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Đánh giá Nội bộ
          </Link>
          <Link
            to="/"
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Đánh giá SA
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/duyet-don`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Duyệt đơn
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/noibo/hop-dau-gio`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            BB HỌP ĐẦU GIỜ
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/welcome`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Lịch làm việc
          </Link>
          <Link
            to={`${configuration().LARAVEL_URL}/gioi-thieu`}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110"
          >
            Giới thiệu cty
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
