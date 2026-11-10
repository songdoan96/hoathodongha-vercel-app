import { useQueryClient } from "@tanstack/react-query";
import { differenceInMinutes, format } from "date-fns";
import { Factory, LogOut, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import FormSecurityListComponent from "~/components/Forms/Security";
import { HeaderComponent, HeaderRight, HeaderTitle } from "~/components/Header";
import Loading from "~/components/Loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import GuestIcon from "~/features/guest/components/GuestIcon";
import { FORMS_QUERY_KEY } from "~/hooks/forms-hook";
import { useGuestFlowFindAll } from "~/hooks/guestflow-hook";
import routers from "~/lib/routers";
export function meta() {
  return [
    { title: "Danh sách đơn nghỉ phép, ra cổng" },
    { name: "description", content: "Danh sách đơn nghỉ phép, ra cổng" },
  ];
}

function FormDashboard() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { data: guests, isLoading } = useGuestFlowFindAll(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [hereCount, setHereCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  useEffect(() => {
    if (!guests) return;
    var countHere = 0,
      countLeave = 0;
    guests.forEach((guest) => {
      const dave = guest.guestFlowOuts.reduce(
        (total, out) => total + out.soluong,
        0,
      );
      const conlai = guest.soluongnguoi - dave;
      countHere += conlai;
      countLeave += dave;
    });
    setHereCount(countHere);
    setLeaveCount(countLeave);
  }, [guests]);

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent
        logoLink={routers().forms.security}
        handleClick={() =>
          queryClient.invalidateQueries({
            queryKey: [FORMS_QUERY_KEY.SECURITY],
          })
        }
      >
        <HeaderTitle>Bảo vệ xác nhận ra cổng</HeaderTitle>
        <HeaderRight>
          <Link
            to={routers().guestFlow.add}
            state={{ from: location.pathname }}
          >
            <Truck size={32} />
          </Link>
        </HeaderRight>
      </HeaderComponent>
      <div className="flex flex-col md:flex-row p-2 gap-6">
        <Link
          to={routers().guestFlow.dashboard}
          state={{ from: location.pathname }}
          className="w-full md:w-1/5 p-2 flex flex-col justify-around gap-2 border-2 border-blue-800 uppercase text-xl font-semibold"
        >
          <div className="flex items-center gap-2 text-green-700">
            <Factory />
            <span className="">Đang ở nhà máy</span>
            <span className="ml-auto w-10 h-10 rounded-full bg-green-700 text-white flex justify-center items-center">
              {hereCount}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <LogOut />
            <span className="">Đã về</span>
            <span className="ml-auto w-10 h-10 rounded-full bg-red-700 text-white flex justify-center items-center">
              {leaveCount}
            </span>
          </div>
        </Link>
        <div className="flex-1">
          <div className="flex h-full gap-2">
            <Carousel className="w-full max-w-350 mx-auto h-full">
              <CarouselContent className="-ml-1">
                {guests?.map((guest, index) => {
                  const dave = guest.guestFlowOuts.reduce(
                    (total, out) => total + out.soluong,
                    0,
                  );
                  if (dave < guest.soluongnguoi)
                    return (
                      <CarouselItem
                        key={index}
                        className="basis-full md:basis-1/5 pl-4 first:pl-1"
                      >
                        <Link
                          to={routers().guestFlow.out(guest.id)}
                          state={{ from: location.pathname }}
                          className="flex flex-col justify-between border-2 border-blue-800 h-full md:min-w-52 p-1 px-2 font-bold gap-1"
                          key={guest.id}
                        >
                          <h1 className="text-red-700 md:text-lg">
                            {guest.khachhang}
                          </h1>
                          <div className="text-blue-700 flex justify-between mt-auto">
                            <h1>
                              Còn {guest.soluongnguoi - dave}/
                              {guest.soluongnguoi} người
                            </h1>
                            <GuestIcon
                              id={guest.phuongtien}
                              isActive={true}
                              size={24}
                            />
                          </div>
                          <div className="flex justify-between text-green-900">
                            <h1>{format(guest.createdAt, "HH:mm")}</h1>
                            <h1>
                              {(
                                differenceInMinutes(
                                  new Date(),
                                  guest.createdAt,
                                ) / 60
                              ).toFixed(1)}
                              h
                            </h1>
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                })}
              </CarouselContent>
              <CarouselPrevious variant={"default"} />
              <CarouselNext variant={"default"} />
            </Carousel>
          </div>
        </div>
      </div>
      <FormSecurityListComponent />
    </div>
  );
}

export default FormDashboard;
