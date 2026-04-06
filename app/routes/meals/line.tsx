import { addDays, eachDayOfInterval, format, getDay } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { Salad } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Field, FieldLabel } from "~/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group";
import { useMealsNextDay, useMealsNextDayCreate } from "~/hooks/meals-hook";
import routers from "~/lib/routers";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";

export function meta() {
  return [{ title: "ĂN SÁNG CHUYỀN" }];
}
function MealsLine() {
  const { user } = useAuthStore();
  if (!user) return null;
  const today = new Date();
  // const bophan = user.bophan.startsWith("X") ? user.bophan.slice(0, 2) + "_duphong" : user.bophan;
  const bophan = user.bophan.includes("quandoc")
    ? user.bophan.slice(0, 2) + "_duphong"
    : user.bophan;
  const { data: meals, isLoading } = useMealsNextDay(bophan);
  const [formData, setFormData] =
    useState<{ id: string; ngay: string; firstQty: string; secondQty: string }[]>();
  const { mutate, isPending } = useMealsNextDayCreate();
  useEffect(() => {
    if (meals) {
      setFormData(() =>
        meals.map((meal) => ({
          id: meal.id,
          ngay: format(meal.ngay, "yyyy-MM-dd"),
          firstQty: meal.mealLines.find((ml) => ml.bophan === bophan)?.firstQty.toString() || "",
          secondQty: meal.mealLines.find((ml) => ml.bophan === bophan)?.secondQty.toString() || "",
        })),
      );
    }
  }, [meals]);

  function handleSubmit(id?: string) {
    if (id) {
      const findForm = formData?.find((f) => f.id === id);
      if (user?.username && (findForm?.firstQty || findForm?.secondQty)) {
        mutate({
          formData: {
            firstQty: +findForm.firstQty || 0,
            secondQty: +findForm.secondQty || 0,
            bophan,
            id,
          },
        });
      }
    }
  }

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent>
        <h1 className="uppercase text-xl text-white mx-auto font-semibold text-center">
          Đăng ký ăn sáng
        </h1>
        <Link to={routers().meals.dashboard}>
          <Salad color="#fff" size={30} />
        </Link>
      </HeaderComponent>
      <div className="px-2">
        <h1 className="text-center bg-teal-50 text-teal-700 py-2 my-2 uppercase text-2xl font-semibold">
          Bộ phận: {linesList.find((line) => line.value === bophan)?.name}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {eachDayOfInterval({ start: addDays(today, 1), end: addDays(today, 7) }).map(
            (day, index) => {
              const meal = meals?.find(
                (meal) => format(meal.ngay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"),
              );
              const findForm = formData?.find((f) => f.ngay === format(day, "yyyy-MM-dd"));
              if (getDay(day) !== 0 && findForm) {
                return (
                  <div key={index} className="w-full border rounded-xl overflow-hidden shadow">
                    <h1 className="bg-blue-50 text-blue-700 text-center font-semibold p-2">
                      {format(day, "EEEEE - dd/MM", { locale: vi })}
                    </h1>
                    <div className="bg-white grid grid-cols-2 gap-2 lg:gap-6 p-2">
                      <div className="flex flex-col gap-2">
                        <Field>
                          <FieldLabel htmlFor={`first-${index}`} className="text-lg">
                            {meal?.first}
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={`first-${index}`}
                              value={findForm?.firstQty || ""}
                              onChange={(e) =>
                                setFormData((prev) =>
                                  prev?.map((item) =>
                                    item.ngay === format(day, "yyyy-MM-dd")
                                      ? { ...item, firstQty: e.target.value }
                                      : item,
                                  ),
                                )
                              }
                            />
                            <InputGroupAddon align="inline-end">suất</InputGroupAddon>
                          </InputGroup>
                        </Field>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Field>
                          <FieldLabel htmlFor={`second-${index}`} className="text-lg">
                            {meal?.second}
                            {meal?.isSpecial && (
                              <div className="flex items-center gap-0.5">
                                <img src="/images/star.svg" className="w-6 inline-block" />
                                <span>x4</span>
                              </div>
                            )}
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              id={`second-${index}`}
                              value={findForm?.secondQty || ""}
                              onChange={(e) =>
                                setFormData((prev) =>
                                  prev?.map((item) =>
                                    item.ngay === format(day, "yyyy-MM-dd")
                                      ? { ...item, secondQty: e.target.value }
                                      : item,
                                  ),
                                )
                              }
                            />
                            <InputGroupAddon align="inline-end">suất</InputGroupAddon>
                          </InputGroup>
                        </Field>
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center my-2 relative">
                      <Button
                        className="uppercase"
                        disabled={isPending}
                        onClick={() => handleSubmit(meal?.id)}
                      >
                        Đăng ký
                      </Button>
                      <span className="absolute bottom-0 right-2 bg-teal-100 text-teal-700 font-semibold p-1">
                        {Number(findForm?.firstQty) * 3 +
                          Number(findForm?.secondQty) * (meal?.isSpecial ? 4 : 3)}
                        <span className="ml-0.5">phiếu</span>
                      </span>
                    </div>
                  </div>
                );
              }
            },
          )}
        </div>
      </div>
    </div>
  );
}

export default MealsLine;
