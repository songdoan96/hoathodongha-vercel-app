import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { Square, SquareCheck, X } from "lucide-react";
import { apiFormGetOne } from "~/apis/form.api";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { QUERY_KEY } from "~/lib/queryKey";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { FormType } from "~/types/form.type";
import type { Route } from "./+types/view";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Xem đơn" }, { name: "description", content: "Xem đơn" }];
}
export async function clientLoader({ params: { id } }: Route.LoaderArgs) {
  return id;
}
function FormView({ loaderData: id }: Route.ComponentProps) {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery<FormType>({
    queryKey: [QUERY_KEY.form.FIND_ONE, id],
    queryFn: () => apiFormGetOne(id),
    enabled: !!id,
  });
  if (isLoading) {
    return <Loading fullScreen />;
  }
  const needToTruong = linesList.find((line) => line.value === data?.to)?.needToTruong;
  const needQuanDoc = linesList.find((line) => line.value === data?.to)?.needQuanDoc;

  return (
    <div>
      {data?.loaidon === "leave" ? (
        <div className="h-screen flex justify-center items-center bg-gray-300  lg:p-4">
          <div className="w-full lg:w-3/5 mx-auto p-2 md:p-4 shadow-lg bg-white">
            <div className="justify-between hidden md:flex">
              <div className="text-center font-bold">
                <p>Tổng công ty cổ phần dệt may Hòa Thọ</p>
                <p>Công ty may Hòa Thọ Đông Hà</p>
              </div>
              <div className="text-center font-bold">
                <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p>Độc lập - Tự do - Hạnh phúc</p>
              </div>
            </div>
            <h1 className="uppercase font-bold text-3xl text-center mt-10">Giấy xin nghỉ phép</h1>
            <p className="uppercase font-bold mt-4">
              <span className="underline">Kính gửi:</span> Ban lãnh đạo công ty may Hòa Thọ Đông Hà
            </p>
            <div className="mt-10 flex gap-4 lg:gap-8">
              <div className="">
                <span className="font-semibold">Tôi tên là: </span>
                <span className="underline text-blue-900 font-bold">{data?.hoten}</span>
              </div>
              <div className="">
                <span className="font-semibold">Tổ: </span>
                <span className="underline text-blue-900 font-bold">
                  {linesList.find((line) => line.value === data?.to)?.name}
                </span>
              </div>
              <div className="">
                <span className="font-semibold">MSNV: </span>
                <span className="underline text-blue-900 font-bold">{data?.msnv}</span>
              </div>
            </div>

            <div className=" mt-4">
              <span className="font-semibold">Kính xin BLĐ công ty cho phép tôi được nghỉ: </span>
              <span className="underline text-blue-900 font-bold">{data?.songaynghi} ngày</span>
            </div>
            <div className="flex mt-4">
              <div className="">
                <span className="font-semibold">Kể từ ngày: </span>
                <span className="underline text-blue-900 font-bold">
                  {data?.tungay && formatDate(data.tungay, "dd/MM/yyyy")}1
                </span>
              </div>
              <div className=" ml-10">
                <span className="font-semibold">Đến ngày: </span>
                <span className="underline text-blue-900 font-bold">
                  {data?.denngay && formatDate(data.denngay, "dd/MM/yyyy")}
                </span>
              </div>
            </div>
            <div className=" mt-4">
              <span className="font-semibold">Lý do: </span>
              <span className="underline text-blue-900 font-bold">{data?.lydo}</span>
            </div>
            <div className="mt-4 flex gap-8 items-center">
              <div className="flex gap-2">
                <span className="text-blue-900 font-bold">Đã bố trí thay thế</span>
                {data?.thaythe && <SquareCheck color="green" size={20} />}
              </div>
              <div className="flex gap-2">
                <span className="text-blue-900 font-bold">Chưa bố trí thay thế</span>
                {!data?.thaythe && <Square color="red" size={20} />}
              </div>
            </div>

            <div className="mt-2 text-right">
              <span className="font-semibold">
                {data?.ngaytao &&
                  `Đông Hà, ngày ${formatDate(data.ngaytao, "dd")} tháng ${formatDate(
                    data.ngaytao,
                    "MM"
                  )} năm ${formatDate(data.ngaytao, "yyyy")}`}
              </span>
            </div>
            <div className="grid grid-cols-4 mt-10">
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Duyệt</span>
                <span className="italic">
                  <div className="flex items-center justify-center">
                    {!data?.lanhdao && <X color="red" size={20} />}
                    {data?.lanhdao
                      ? data.lanhdao
                      : user &&
                        user.bophan === "lanhdao" &&
                        ((!needToTruong && !needQuanDoc) ||
                          (needToTruong && needQuanDoc && data?.quandoc) ||
                          (needToTruong && !needQuanDoc && data?.totruong) ||
                          (!needToTruong && needQuanDoc && data?.quandoc)) && (
                          <Button
                            //   onClick={() => handleSignature("lanhdao")}
                            variant="link"
                          >
                            Ký đơn
                          </Button>
                        )}
                  </div>
                </span>
              </div>
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Quản đốc</span>
                <span className="italic">
                  <div className="flex items-center justify-center">
                    {!data?.quandoc && needQuanDoc && <X color="red" size={20} />}
                    {data?.quandoc
                      ? data.quandoc
                      : user &&
                        user.bophan === "quandoc" &&
                        ((needToTruong && needQuanDoc && data?.totruong) ||
                          (!needToTruong && needQuanDoc)) && (
                          <Button
                            //   onClick={() => handleSignature("quandoc")}
                            variant="link"
                          >
                            Ký đơn
                          </Button>
                        )}
                  </div>
                </span>
              </div>
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Tổ trưởng</span>
                <span className="italic">
                  <div className="flex justify-center items-center">
                    {data?.totruong}
                    {/* {!data?.totruong && needToTruong && <X color="red" size={20} />}
                    {data?.totruong
                      ? data.totruong
                      : user?.bophan === data?.to && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="link">Ký đơn</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Ký đơn</AlertDialogTitle>
                                <AlertDialogDescription asChild>
                                  <RadioGroup
                                    onValueChange={(value) => setThaytheValue(value)}
                                    defaultValue={thaytheValue}
                                    className="mt-4"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="true" id="thaythetrue" />
                                      <Label htmlFor="thaythetrue" className="text-green-700">
                                        Đã bố trí thay thế
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="false" id="thaythefalse" />
                                      <Label htmlFor="thaythefalse" className="text-red-700">
                                        Chưa bố trí thay thế
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleSignature("totruong")}>
                                  Ký đơn
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )} */}
                  </div>
                </span>
              </div>
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Người xin phép</span>
                <span className="italic">{data?.hoten}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen p-2 flex flex-col justify-center items-center bg-gray-300">
          <div className="w-full lg:w-3/5 mx-auto p-2 md:p-4  shadow-lg bg-white">
            <div className="justify-between hidden md:flex">
              <div className="text-center font-bold">
                <p>Tổng công ty cổ phần dệt may Hòa Thọ</p>
                <p>Công ty may Hòa Thọ Đông Hà</p>
              </div>
              <div className="text-center font-bold">
                <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p>Độc lập - Tự do - Hạnh phúc</p>
              </div>
            </div>
            <h1 className="uppercase font-bold text-3xl text-center mt-10">Giấy phép ra cổng</h1>
            <div className="px-2 lg:px-10">
              <p className="uppercase font-bold mt-4">
                <span className="underline">Kính gửi: </span> Ban lãnh đạo công ty may Hòa Thọ Đông
                Hà
              </p>
              <div className=" mt-10">
                <span className="font-semibold">Họ tên: </span>
                <span className="underline text-blue-900 font-bold">{data?.hoten}</span>
              </div>
              <div className=" mt-2">
                <span className="font-semibold">MSNV: </span>
                <span className="underline text-blue-900 font-bold">{data?.msnv}</span>
              </div>
              <div className=" mt-2">
                <span className="font-semibold">Tổ: </span>
                <span className="underline text-blue-900 font-bold">
                  {linesList.find((line) => line.value === data?.to)?.name}
                </span>
              </div>
              <div className=" mt-2">
                <span className="font-semibold">Xin ngày: </span>
                <span className="underline text-blue-900 font-bold">
                  {data?.rangay && formatDate(data.rangay, "dd/MM/yyyy")}
                </span>
              </div>
              <div className=" mt-2">
                <span className="font-semibold">Lý do: </span>
                <span className="underline text-blue-900 font-bold">{data?.lydo}</span>
              </div>
              <div className="flex mt-2 items-center">
                <div className="">
                  <span className="font-semibold">Từ: </span>
                  <span className="underline text-blue-900 font-bold">{data?.tugio}</span>
                </div>
                <div className="ml-24">
                  <span className="font-semibold">Đến: </span>
                  <span className="underline text-blue-900 font-bold">{data?.dengio}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-8 items-center">
                <div className="flex gap-2">
                  <span className="text-blue-900 font-bold">Đã bố trí thay thế</span>
                  {data?.thaythe && <SquareCheck color="green" size={20} />}
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-900 font-bold">Chưa bố trí thay thế</span>
                  {!data?.thaythe && <Square color="red" size={20} />}
                </div>
              </div>

              <div className="mt-2 text-right">
                {data?.ngaytao && (
                  <span className="font-semibold">{`Đông Hà, ngày ${formatDate(
                    data.ngaytao,
                    "dd"
                  )} tháng ${formatDate(data.ngaytao, "MM")} năm ${formatDate(
                    data.ngaytao,
                    "yyyy"
                  )}`}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 mt-10">
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Duyệt</span>
                <span className="italic">
                  <div className="flex items-center justify-center">
                    {!data?.lanhdao && <X color="red" size={20} />}
                    {data?.lanhdao
                      ? data.lanhdao
                      : user &&
                        user.bophan === "lanhdao" &&
                        ((!needToTruong && !needQuanDoc) ||
                          (needToTruong && needQuanDoc && data?.quandoc) ||
                          (needToTruong && !needQuanDoc && data?.totruong) ||
                          (!needToTruong && needQuanDoc && data?.quandoc)) && (
                          <Button
                            //   onClick={() => handleSignature("lanhdao")}
                            variant="link"
                          >
                            Ký đơn
                          </Button>
                        )}
                  </div>
                </span>
              </div>
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Quản đốc</span>
                <span className="italic">
                  <div className="flex items-center justify-center">
                    {!data?.quandoc && needQuanDoc && <X color="red" size={20} />}
                    {data?.quandoc
                      ? data.quandoc
                      : user &&
                        user.bophan === "quandoc" &&
                        ((needToTruong && needQuanDoc && data?.totruong) ||
                          (!needToTruong && needQuanDoc)) && (
                          <Button
                            //   onClick={() => handleSignature("quandoc")}
                            variant="link"
                          >
                            Ký đơn
                          </Button>
                        )}
                  </div>
                </span>
              </div>
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Tổ trưởng</span>
                <span className="italic">
                  <div className="flex justify-center items-center">
                    {data?.totruong}
                    {/* {!data?.totruong && needToTruong && <X color="red" size={20} />}
                    {data?.totruong
                      ? data.totruong
                      : user?.bophan === data?.to && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="link">Ký đơn</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Ký đơn</AlertDialogTitle>
                                <AlertDialogDescription asChild>
                                  <RadioGroup
                                    onValueChange={(value) => setThaytheValue(value)}
                                    defaultValue={thaytheValue}
                                    className="mt-4"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="true" id="thaythetrue" />
                                      <Label htmlFor="thaythetrue" className="text-green-700">
                                        Đã bố trí thay thế
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="false" id="thaythefalse" />
                                      <Label htmlFor="thaythefalse" className="text-red-700">
                                        Chưa bố trí thay thế
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleSignature("totruong")}>
                                  Ký đơn
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )} */}
                  </div>
                </span>
              </div>
              <div className="flex text-center flex-col">
                <span className="uppercase font-bold mb-2">Người xin phép</span>
                <span className="italic">{data?.hoten}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormView;
