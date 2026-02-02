import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Columns4, Download, FileInput } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { apiSalariesUpload } from "~/apis/salaries.api";
import { API_BASE_URL } from "~/lib/api-client";

export default function Upload() {
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"));
  const mutation = useMutation({
    mutationFn: apiSalariesUpload,
    onSuccess: () => {
      toast.success("Tải lên thành công");
    },
    onError: () => {
      toast.error("Tải không thành công");
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast.error("Chưa chọn file!");
      return;
    }
    if (!month) {
      toast.error("Chưa chọn tháng!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("month", month);
    mutation.mutate(formData);
  };
  return (
    <div className="h-screen w-screen bg-gray-200">
      <div className="h-12 bg-blue-500 flex items-center justify-between px-4">
        <img src="/images/logo.png" alt="" className="w-10" />
        <div className="flex flex-1 justify-center items-center gap-12">
          <h1 className="text-white text-2xl uppercase text-center font-bold">
            Tải lương lên hệ thống
          </h1>
        </div>

        <Link to={"/luong/chitiet?month=" + month} className="text-white flex items-center gap-1">
          <Columns4 />
          <span>Chi tiết</span>
        </Link>
      </div>
      <div className="w-1/2 mx-auto border p-8 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12">
              <Link
                to={API_BASE_URL + "/salaries/file-download"}
                className="flex gap-2 mt-4 justify-center items-center underline text-red-600"
              >
                <span>Tải file mẫu</span>
                <Download />
              </Link>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="mt-2 col-span-full">
                  <label htmlFor="month" className="block text-sm/6 font-medium text-gray-900 mb-2">
                    Tháng
                  </label>
                  <input
                    id="month"
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    max={format(new Date(), "yyyy-MM")}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <div className="col-span-full ">
                  <label htmlFor="file" className="block text-sm/6 font-medium text-gray-900">
                    Chọn file
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 flex gap-4 items-center text-sm/6 text-gray-600">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                        >
                          <FileInput aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                        </label>
                        <input id="file" name="file" type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Tải lên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
