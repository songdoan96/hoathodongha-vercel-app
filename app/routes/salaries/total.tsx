import { format } from "date-fns";
import React from "react";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import useSalaryStore from "~/stores/salary-store";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useSalariesDashboard } from "~/hooks/salaries-hook";
import { is } from "zod/v4/locales";
import Loading from "~/components/Loading";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;
function SalaryTotal() {
  const { cccd, msnv } = useSalaryStore();
  console.log(`🚀 ~ SalaryTotal ~ { cccd, msnv }:`, { cccd, msnv });
  const { data: salaries, isLoading } = useSalariesDashboard({
    msnv,
    cccd,
  });
  console.log("🚀 ~ SalaryTotal ~ salaries:", salaries);
  const salary = salaries?.[0];
  return (
    <div className="bg-gray-50 min-h-screen h-full w-full flex flex-col">
      <HeaderComponent>
        <HeaderTitle>Tổng hợp lương</HeaderTitle>
      </HeaderComponent>
      {isLoading && <Loading fullScreen />}
      <div className="h-full w-full flex-1 flex flex-col">
        <div className="info p-2 w-full mx-auto">
          <div className="rounded p-2 bg-white shadow border">
            <div className="flex items-center gap-1">
              <span>Họ tên:</span>
              <span>{salary?.hoten}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Tổ:</span>
              <span>{salary?.to}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>MSNV:</span>
              <span>{salary?.msnv}</span>
            </div>
          </div>
        </div>
      </div>
      {salaries?.length && (
        <div className="bg-red-500 h-full hidden">
          <div className="grid grid-cols-3 gap-2 h-1/3">
            <div className="a">name</div>
            <div className="gird grid-cols-1 text-white col-span-2">
              <div className="relative bg-[#5a82d1] rounded shadow-xl flex flex-col overflow-hidden h-full">
                <div className="z-10 top-0 left-0 p-2 w-full flex flex-col justify-between text-center">
                  <h1 className="text-base uppercase">Tổng thu nhập</h1>
                  <h2 className="font-bold text-3xl">100.000.000</h2>
                </div>
                <svg
                  className="absolute bottom-0 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#688fd4"
                    fillOpacity={1}
                    d="M0,256L20,266.7C40,277,80,299,120,261.3C160,224,200,128,240,101.3C280,75,320,117,360,117.3C400,117,440,75,480,53.3C520,32,560,32,600,69.3C640,107,680,181,720,186.7C760,192,800,128,840,112C880,96,920,128,960,165.3C1000,203,1040,245,1080,240C1120,235,1160,181,1200,165.3C1240,149,1280,171,1320,186.7C1360,203,1400,213,1420,218.7L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
                  />
                </svg>
              </div>
              <div className="relative bg-[#34b2c6] rounded shadow-xl flex flex-col overflow-hidden h-full">
                <div className="z-10 top-0 left-0 p-2 w-full flex flex-col justify-between text-center">
                  <h1 className="text-base uppercase">thu nhập bình quân</h1>
                  <h2 className="font-bold text-3xl">100.000.000</h2>
                </div>
                <svg
                  className="absolute bottom-0 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#4ab8c2"
                    fillOpacity={1}
                    d="M0,256L20,266.7C40,277,80,299,120,261.3C160,224,200,128,240,101.3C280,75,320,117,360,117.3C400,117,440,75,480,53.3C520,32,560,32,600,69.3C640,107,680,181,720,186.7C760,192,800,128,840,112C880,96,920,128,960,165.3C1000,203,1040,245,1080,240C1120,235,1160,181,1200,165.3C1240,149,1280,171,1320,186.7C1360,203,1400,213,1420,218.7L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
                  />
                </svg>
              </div>
              <div className="relative bg-[#fcb94f] rounded shadow-xl flex flex-col overflow-hidden h-full">
                <div className="z-10 top-0 left-0 p-2 w-full flex flex-col justify-between text-center">
                  <h1 className="text-base uppercase">Tổng Lương SP</h1>
                  <h2 className="font-bold text-3xl">100.000.000</h2>
                </div>
                <svg
                  className="absolute bottom-0 w-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="#fcc850"
                    fillOpacity={1}
                    d="M0,256L20,266.7C40,277,80,299,120,261.3C160,224,200,128,240,101.3C280,75,320,117,360,117.3C400,117,440,75,480,53.3C520,32,560,32,600,69.3C640,107,680,181,720,186.7C760,192,800,128,840,112C880,96,920,128,960,165.3C1000,203,1040,245,1080,240C1120,235,1160,181,1200,165.3C1240,149,1280,171,1320,186.7C1360,203,1400,213,1420,218.7L1440,224L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full ">
            <ChartContainer config={chartConfig} className="max-h-96">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="month"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="desktop" type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="desktop" layout="vertical" fill="var(--color-desktop)" radius={4}>
                  <LabelList
                    dataKey="month"
                    position="insideLeft"
                    offset={8}
                    className="fill-(--color-label)"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="desktop"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryTotal;
