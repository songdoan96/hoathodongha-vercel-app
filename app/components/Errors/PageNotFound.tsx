import { useNavigate } from "react-router";
import { Button } from "../ui/button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Trang không tồn tại hoặc đã bị xóa
          </p>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
