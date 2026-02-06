import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { apiSalariesCheck } from "~/apis/salaries.api";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { getFCMToken } from "~/lib/firebase";
import routers from "~/lib/routers";
import {
  SalariesSchema,
  type SalariesSchemaType,
} from "~/schemas/salaries.schema";
import useSalaryStore from "~/stores/salary-store";

export function meta() {
  return [
    {
      title: "Tra cứu lương",
    },
    {
      name: "description",
      content: "Tra cứu lương",
    },
  ];
}
export default function SalariesSearch() {
  const { setSalary } = useSalaryStore();
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<SalariesSchemaType>({
    resolver: zodResolver(SalariesSchema),
    defaultValues: {
      msnv: "",
      cccd: "",
      // month: format(new Date(), "yyyy-MM"),
    },
  });
  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await getFCMToken();
        if (fcmToken) {
          setToken(fcmToken);
        }
      }
    };
    requestPermission();
  }, []);
  const mutation = useMutation({
    mutationFn: apiSalariesCheck,
    onSuccess: (res) => {
      // navigate(
      //   "/luong/chitiet?msnv=" +
      //     res.msnv +
      //     "&cccd=" +
      //     res.cccd +
      //     "&month=" +
      //     format(new Date(res.thang), "yyyy-MM"),
      // );
      navigate(
        "/luong/chitiet?month=" + format(new Date(res.thang), "yyyy-MM"),
      );
      setSalary({ msnv: res.msnv, cccd: res.cccd });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: SalariesSchemaType) {
    mutation.mutate({
      ...values,
      token,
    });
  }
  return (
    <div className="bg-[#ebeaea] h-screen w-screen flex justify-center items-center p-2 md:py-8">
      <div className="w-full md:w-1/3 mx-auto border bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row gap-2 items-center w-full bg-blue-600 text-white p-0.5 md:p-2">
          <Link to={"/"}>
            <img src="/images/logo.png" className="w-10" alt="" />
          </Link>
          <h1 className="font-bold text-[18px] md:text-2xl text-center flex-1 uppercase">
            Công ty may Hòa Thọ Đông Hà
          </h1>
        </div>
        <h1 className="my-4 font-bold uppercase text-center text-xl md:text-2xl text-blue-600">
          Hệ thống tra cứu lương
        </h1>
        <div className="px-2 md:px-4">
          <p className="font-semibold text-center italic">
            Nhập mã số nhân viên và căn cước công dân để xem chi tiết lương
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 my-auto">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="msnv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">MSNV:</FormLabel>
                    <FormControl>
                      <Input {...field} required autoComplete="on" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cccd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">CCCD:</FormLabel>
                    <FormControl>
                      <Input {...field} required autoComplete="on" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Tháng:</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="flex gap-4 justify-center items-center w-full col-span-2 mt-8">
              <Button
                asChild
                className="bg-red-500 hover:bg-red-600 cursor-pointer min-w-[100px]"
                onClick={() => navigate(routers().main.home)}
              >
                <span>Quay lại</span>
              </Button>
              <Button
                disabled={mutation.isPending}
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 min-w-[100px]"
              >
                Tra cứu
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
