import { format } from "date-fns";
import { useEffect, useState } from "react";
import { HeaderComponent } from "~/components/Header";
import Loading from "~/components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useMealsNextDay, useMealsNextDayCreate } from "~/hooks/meals-hook";
import useAuthStore from "~/stores/auth-store";

function MealsLine() {
  const { user } = useAuthStore();
  if (!user) return null;
  const { data, isLoading } = useMealsNextDay(user.bophan);
  const { mutate } = useMealsNextDayCreate();
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const meal = data?.meal;
  const mealLine = data?.mealLine;
  useEffect(() => {
    if (mealLine) {
      setFirst(mealLine.firstQty);
      setSecond(mealLine.secondQty);
    }
  }, [mealLine]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user && meal) {
      mutate({
        formData: {
          firstQty: first,
          secondQty: second,
          bophan: user.bophan,
          mealId: meal.id,
          id: mealLine?.id,
        },
      });
    }
  }

  if (isLoading) return <Loading fullScreen />;
  return (
    <div>
      <HeaderComponent>
        <h1 className="uppercase text-xl text-white mx-auto font-semibold">
          Đăng ký ăn sáng {format(meal?.ngay || new Date(), "dd/MM")}
        </h1>
      </HeaderComponent>
      <div className="p-2 ">
        <div className="border shadow-2xl rounded-xl overflow-hidden pb-10">
          <div className="p-2 bg-blue-50 text-center font-bold uppercase text-blue-700 text-2xl">
            <h1>Món ăn</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 p-2">
              <div className="flex flex-col w-full gap-2">
                <Label className="flex-1 font-semibold text-blue-700 text-xl" htmlFor="meal-first">
                  1. {meal?.first} :
                </Label>
                <div className="flex w-full gap-2 px-4">
                  <Input
                    type="number"
                    min={0}
                    required
                    value={first}
                    onChange={(e) => setFirst(+e.target.value)}
                    id="meal-first"
                    name="meal-first"
                    className="mx-auto flex-1"
                  />
                  <span className="w-24 p-2 rounded bg-blue-50 text-blue-700 flex justify-center items-center font-semibold">
                    x3 phiếu
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label className="flex-1 font-semibold text-blue-700 text-xl" htmlFor="meal-second">
                  2. {meal?.second} :
                </Label>
                <div className="flex w-full gap-2 px-4">
                  <Input
                    type="number"
                    min={0}
                    required
                    value={second}
                    onChange={(e) => setSecond(+e.target.value)}
                    id="meal-second"
                    name="meal-second"
                    className="mx-auto flex-1"
                  />
                  <span className="w-24 p-2 rounded bg-blue-50 text-blue-700 flex justify-center items-center font-semibold">
                    x3 phiếu
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full my-4 uppercase">
              <span className="bg-teal-50 text-teal-700 p-2 px-4 font-semibold uppercase text-xl border-2 border-teal-800 shadow-2xl">
                Tổng: {(first + second) * 3} phiếu
              </span>
            </div>
            <div className="flex w-full justify-center items-center mt-8">
              <Button type="submit" className="min-w-32 uppercase text-base">
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MealsLine;
