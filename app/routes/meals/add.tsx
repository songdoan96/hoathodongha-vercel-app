import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  set,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from "date-fns";
import React, { useEffect, useState } from "react";
import { vi } from "date-fns/locale";
import { HeaderComponent } from "~/components/Header";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useMealsFindAll, useMealsCreate } from "~/hooks/meals-hook";
import type { MealsType } from "~/types/meals-type";
import Loading from "~/components/Loading";

export default function MealsAdd() {
  const today = new Date();
  const { data, isLoading } = useMealsFindAll();
  const [meals, setMeals] = React.useState<{ ngay: string; main: string; second: string }[]>([]);
  const { mutate } = useMealsCreate();

  useEffect(() => {
    if (data) {
      const dataMeals: { ngay: string; main: string; second: string }[] = [];
      eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) }).map((day) => {
        const meal = data.find((item) => isSameDay(item.ngay, day));
        if (meal) {
          dataMeals.push({
            main: meal.main,
            second: meal.second,
            ngay: format(meal.ngay, "yyyy-MM-dd"),
          });
        } else {
          dataMeals.push({ ngay: format(day, "yyyy-MM-dd"), main: "", second: "" });
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
      <HeaderComponent>
        <h1>Nhà ăn</h1>
      </HeaderComponent>
      <div className="w-full">
        <table>
          <thead>
            <tr>
              <th className="border p-2">Ngày</th>
              <th className="border p-2">Thứ</th>
              <th className="border p-2">Món chính</th>
              <th className="border p-2">Món phụ</th>
              <th className="border p-2"></th>
            </tr>
          </thead>

          <tbody>
            {eachDayOfInterval({ start: startOfMonth(today), end: endOfMonth(today) }).map(
              (day, index) => (
                <tr key={index} className={`${getDay(day) === 0 ? "bg-red-50" : ""}`}>
                  <td className="border p-2">{format(day, "dd/MM/yyyy")}</td>
                  <td className="border p-2">{format(day, "eeee", { locale: vi })}</td>
                  <td className="border p-2">
                    <Input
                      className="inline-flex"
                      type="text"
                      placeholder="món chính"
                      value={
                        meals.find((item) => item.ngay === format(day, "yyyy-MM-dd"))?.main || ""
                      }
                      onChange={(e) =>
                        setMeals(() =>
                          meals.map((item) =>
                            item.ngay === format(day, "yyyy-MM-dd")
                              ? { ...item, main: e.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <Input
                      className="inline-flex"
                      type="text"
                      placeholder="món phụ"
                      value={
                        meals.find((item) => item.ngay === format(day, "yyyy-MM-dd"))?.second || ""
                      }
                      onChange={(e) =>
                        setMeals(() =>
                          meals.map((item) =>
                            item.ngay === format(day, "yyyy-MM-dd")
                              ? { ...item, second: e.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </td>
                  <td className="border p-2">
                    {meals.find((item) => item.ngay === format(day, "yyyy-MM-dd"))?.main &&
                      meals.find((item) => item.ngay === format(day, "yyyy-MM-dd"))?.second && (
                        <Button onClick={() => handleUpdate(format(day, "yyyy-MM-dd"))}>
                          Cập nhật
                        </Button>
                      )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
