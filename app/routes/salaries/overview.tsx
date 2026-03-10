import { format } from "date-fns";
import { ClipboardPenLine, DollarSign, UserRound } from "lucide-react";
import { Link } from "react-router";
import { Bar, BarChart, CartesianGrid, LabelList, Pie, PieChart, XAxis, YAxis } from "recharts";
import { HeaderComponent, HeaderTitle } from "~/components/Header";
import Loading from "~/components/Loading";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { useSalariesDashboard } from "~/hooks/salaries-hook";
import { formatMoney } from "~/lib/helpers";
import useSalaryStore from "~/stores/salary-store";

const chartConfig = {
  desktop: {
    label: "Desktop",
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
  const tongthunhap =
    salaries?.reduce((acc, salary) => {
      return acc + (salary.tien_luong_thuc_linh || 0);
    }, 0) || 0;
  const tongluongsp =
    salaries?.reduce((acc, salary) => {
      return acc + (salary.tien_luong_sp_theo_cong_doan || 0);
    }, 0) || 0;

  const dataChart = salaries?.map((salary) => ({
    month: format(salary.thang, "MM/yyyy"),
    desktop: salary.tien_luong_thuc_linh,
  }));
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col">
      <HeaderComponent>
        <HeaderTitle>Tổng hợp lương</HeaderTitle>
      </HeaderComponent>
      {isLoading && <Loading fullScreen />}
      <div className="flex flex-col lg:flex-row gap-4 p-2 flex-1">
        <div className="flex flex-col gap-2 lg:w-1/2">
          <div className="w-full mx-auto">
            <div className="p-2 rounded bg-white shadow-xl border flex items-center gap-4">
              <div className="h-full w-1/6 flex justify-center items-center">
                <div className="bg-blue-300 rounded-full w-12 h-12 lg:h-24 lg:w-24 flex justify-center items-center">
                  <UserRound color="#fff" size={50} className="w-8 h-8 lg:w-16 lg:h-16" />
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-1">
                  <span className="font-semibold w-16">Họ tên:</span>
                  <span className="text-blue-500">{salary?.hoten}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold w-16">Tổ:</span>
                  <span className="text-blue-500">{salary?.to}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold w-16">MSNV:</span>
                  <span className="text-blue-500">{salary?.msnv}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-red-50 flex flex-col gap-2">
            <div className="relative bg-[#5a82d1] rounded shadow-xl flex flex-col overflow-hidden h-full">
              <div className="z-10 top-0 left-0 p-2 w-full flex flex-col justify-between text-center">
                <h1 className="text-base uppercase">Tổng thu nhập</h1>
                <h2 className="font-bold text-3xl">{formatMoney(tongthunhap)}</h2>
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
            <div className="relative bg-[#fcb94f] rounded shadow-xl flex flex-col overflow-hidden h-full">
              <div className="z-10 top-0 left-0 p-2 w-full flex flex-col justify-between text-center">
                <h1 className="text-base uppercase">Tổng Lương SP</h1>
                <h2 className="font-bold text-3xl">{formatMoney(tongluongsp)}</h2>
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
            <div className="relative bg-[#34b2c6] rounded shadow-xl flex flex-col overflow-hidden h-full">
              <div className="z-10 top-0 left-0 p-2 w-full flex flex-col justify-between text-center">
                <h1 className="text-base uppercase">thu nhập bình quân</h1>
                <h2 className="font-bold text-3xl">{formatMoney(tongthunhap / 2)}</h2>
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
          </div>
        </div>
        <div className="chart lg:w-1/2 bg-white rounded shadow-2xl p-2 h-full">
          <h1 className="uppercase text-blue-600 font-semibold px-2 lg:px-4 text-xl lg:text-2xl">
            Lương thực lĩnh các tháng
          </h1>
          <div className="px-4 mt-4">
            <ChartContainer
              config={{}}
              className="p-0! mx-auto aspect-square w-full h-full max-h-76"
            >
              <BarChart accessibilityLayer data={dataChart}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={0} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="desktop" fill="#34b2c6" radius={[4, 4, 0, 0]}>
                  <LabelList
                    position="insideBottom"
                    offset={5}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(e: number) => formatMoney(e)}
                    style={{ fill: "black", fontWeight: "500" }}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
      {salaries?.length && (
        <div className="overflow-hidden bg-white rounded-xl mt-4">
          <table className="w-full h-full overflow-hidden">
            <thead>
              <tr className="text-blue-700 uppercase text-base lg:text-xl">
                <th className="border text-center p-2 bg-blue-50">Tháng</th>
                <th className="border text-center p-2 bg-blue-50">Lương sản phẩm</th>
                <th className="border text-center p-2 bg-blue-50">Lương thực lĩnh</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary, index) => (
                <tr key={index} className="text-sm font-semibold">
                  <td className="border text-center p-2 text-teal-700">
                    <Link
                      className="underline font-bold"
                      to={`/luong/chitiet?month=${format(salary.thang, "yyyy-MM")}`}
                    >
                      {format(salary.thang, "MM/yyyy")}
                    </Link>
                  </td>
                  <td className="border text-center p-2">
                    {formatMoney(salary.tien_luong_sp_theo_cong_doan)}
                  </td>
                  <td className="border text-center p-2">
                    {formatMoney(salary.tien_luong_thuc_linh)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8 py-4 flex justify-center items-center gap-4">
        <Link
          to="/luong"
          className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
        >
          <DollarSign /> <span>Tra cứu lương</span>
        </Link>
        <Link
          to="/tao-don"
          className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
        >
          <ClipboardPenLine /> <span>Tạo đơn nghỉ phép</span>
        </Link>
      </div>
    </div>
  );
}

export default SalaryTotal;
