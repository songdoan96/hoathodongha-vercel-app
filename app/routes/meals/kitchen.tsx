import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronsLeft, ChevronsRight, Salad } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import PrintComponent from "~/components/Meals/Print";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useMealsCreate, useMealsFindAll } from "~/hooks/meals-hook";
import routers from "~/lib/routers";

export default function MealsKitchen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = new Date(searchParams.get("month") || format(new Date(), "yyyy-MM"));
  const { data, isLoading } = useMealsFindAll(format(month, "yyyy-MM-dd"));
  const [meals, setMeals] = useState<
    { ngay: string; first: string; second: string; isSpecial?: boolean }[]
  >([]);
  const { mutate, isPending } = useMealsCreate();

  useEffect(() => {
    if (data) {
      const dataMeals: { ngay: string; first: string; second: string; isSpecial?: boolean }[] = [];
      eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map((day) => {
        const meal = data.find((item) => isSameDay(item.ngay, day));
        if (meal) {
          dataMeals.push({
            first: meal.first,
            second: meal.second,
            ngay: format(meal.ngay, "yyyy-MM-dd"),
            isSpecial: meal.isSpecial,
          });
        } else {
          dataMeals.push({
            ngay: format(day, "yyyy-MM-dd"),
            first: "",
            second: "",
            isSpecial: false,
          });
        }
      });
      setMeals(dataMeals);
    }
  }, [data]);

  function handleUpdate(day: string) {
    const formData = meals.find((meal) => meal.ngay === day);
    mutate({ formData });
  }
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return (
    <div>
      <HeaderComponent logoLink={routers().meals.dashboard}>
        <h1 className="uppercase text-2xl text-white font-bold mx-auto">
          DANH SÁCH MÓN ĂN THÁNG {format(new Date(month), "MM/yyyy")}
        </h1>
        <Link to={routers().meals.dashboard}>
          <Salad color="#fff" size={30} />
        </Link>
      </HeaderComponent>
      <div className="flex w-full gap-4">
        <div className="w-2/3">
          <table className="w-full">
            <thead>
              <tr className="uppercase">
                <th className="border p-2">Ngày</th>
                <th className="border p-2">Thứ</th>
                <th className="border p-2">Món 1 (x3)</th>
                <th className="border p-2">Món 2 (x3)</th>
                <th className="border p-2 bg-yellow-50">Đặc biệt (x4)</th>
                <th className="border p-2"></th>
              </tr>
            </thead>

            <tbody>
              {eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }).map(
                (day, index) => {
                  if (getDay(day) !== 0) {
                    const findMeal = meals.find((item) => item.ngay === format(day, "yyyy-MM-dd"));
                    const isSpecial = findMeal?.isSpecial;
                    return (
                      <tr key={index} className={`${getDay(day) === 0 ? "bg-red-50" : ""}`}>
                        <td className="border p-1">{format(day, "dd/MM/yyyy")}</td>
                        <td className="border p-1">{format(day, "EEEE", { locale: vi })}</td>
                        <td className="border p-1">
                          <Input
                            className="inline-flex min-w-40"
                            type="text"
                            name="meals-first"
                            value={findMeal?.first || ""}
                            onChange={(e) =>
                              setMeals(() =>
                                meals.map((item) =>
                                  item.ngay === format(day, "yyyy-MM-dd")
                                    ? { ...item, first: e.target.value }
                                    : item,
                                ),
                              )
                            }
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            className="inline-flex min-w-40"
                            type="text"
                            name="meals-second"
                            value={!isSpecial && findMeal?.second ? findMeal.second : ""}
                            onChange={(e) =>
                              setMeals(() =>
                                meals.map((item) =>
                                  item.ngay === format(day, "yyyy-MM-dd")
                                    ? { ...item, second: e.target.value, isSpecial: false }
                                    : item,
                                ),
                              )
                            }
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            className="inline-flex min-w-40 bg-yellow-50"
                            type="text"
                            name="meals-second"
                            value={isSpecial && findMeal?.second ? findMeal.second : ""}
                            onChange={(e) =>
                              setMeals(() =>
                                meals.map((item) =>
                                  item.ngay === format(day, "yyyy-MM-dd")
                                    ? { ...item, second: e.target.value, isSpecial: true }
                                    : item,
                                ),
                              )
                            }
                          />
                        </td>
                        <td className="border p-1">
                          {findMeal?.first && findMeal?.second && (
                            <Button
                              disabled={isPending}
                              onClick={() => handleUpdate(format(day, "yyyy-MM-dd"))}
                            >
                              Cập nhật
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index} className="bg-red-50 text-red-700 font-semibold">
                        <td className="border p-1">{format(day, "dd/MM/yyyy")}</td>
                        <td colSpan={4} className="text-center text-xl">
                          {format(day, "EE", { locale: vi })}
                        </td>
                      </tr>
                    );
                  }
                },
              )}
            </tbody>
          </table>
          <div className="flex justify-between px-4 my-4 w-full">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded"
              onClick={() => {
                setSearchParams({
                  month: format(subMonths(new Date(month), 1), "yyyy-MM"),
                });
              }}
            >
              <ChevronsLeft />
              <span>{format(subMonths(new Date(month), 1), "MM/yyyy")}</span>
            </button>

            <button
              // disabled={month === format(new Date(), "yyyy-MM")}
              // className={`${month === format(new Date(), "yyyy-MM") ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white flex items-center gap-2 px-4 py-2 rounded`}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded"
              onClick={() => {
                setSearchParams({
                  month: format(addMonths(new Date(month), 1), "yyyy-MM"),
                });
              }}
            >
              <span>{format(addMonths(new Date(month), 1), "MM/yyyy")}</span>
              <ChevronsRight />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="uppercase text-center text-2xl py-2 font-bold text-blue-800">
            Số lượng ăn sáng ngày {format(new Date(), "dd/MM")}
          </h1>
          {<PrintComponent day={format(new Date(), "yyyy-MM-dd")} />}
        </div>
      </div>
    </div>
  );
}
