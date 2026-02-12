import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, subMonths } from "date-fns";
import { CircleUser, ClipboardPenLine, Loader, LockKeyhole, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { apiSalariesCheck } from "~/apis/salaries.api";
import { Field, FieldLabel } from "~/components/ui/field";

import { Form, FormField } from "~/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group";
import { Spinner } from "~/components/ui/spinner";
import { getFCMToken } from "~/lib/firebase";
import { SalariesSchema, type SalariesSchemaType } from "~/schemas/salaries.schema";
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
function SalariesSearch() {
  const { setSalary, cccd, msnv } = useSalaryStore();
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<SalariesSchemaType>({
    resolver: zodResolver(SalariesSchema),
    defaultValues: {
      msnv: "",
      cccd: "",
    },
    values: { cccd, msnv },
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
      navigate("/luong/chitiet?month=" + format(subMonths(new Date(), 1), "yyyy-MM"));
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
    <div className="h-screen w-screen flex flex-col items-center mx-auto bg-gray-100">
      <div className="h-1/3 w-full relative md:hidden">
        <div className="bg-black h-full w-full absolute opacity-20 z-50"></div>
        <img src="/images/logo.png" alt="Logo" className="w-8 z-30 top-2 left-2 absolute" />
        <img
          src="/images/bg.JPG"
          alt=""
          className="h-full w-full bg-contain absolute top-0 left-0 z-10"
        />
      </div>
      <div className="bg-white h-full rounded-t-4xl -mt-6 z-50 flex justify-center items-center md:mt-20 md:border md:h-2/3 md:rounded-2xl md:my-auto">
        <div className="p-4 h-full w-full">
          <h1 className="font-black uppercase text-center text-xl md:text-2xl text-primary scale-y-150">
            Hệ thống tra cứu lương
          </h1>
          <p className="font-semibold text-center text-sm italic my-6 text-gray-500">
            Nhập mã số nhân viên và căn cước công dân để xem chi tiết lương
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="my-auto">
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="msnv"
                  render={({ field }) => (
                    // <FormItem>
                    //   <FormLabel className="font-bold">
                    //     <CircleUser />
                    //     MSNV:
                    //   </FormLabel>
                    //   <FormControl>
                    //     <Input {...field} required autoComplete="on" />
                    //   </FormControl>
                    //   <FormMessage />
                    // </FormItem>
                    <Field className="gap-1">
                      <FieldLabel htmlFor="msnv">MSNV</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id="msnv"
                          placeholder="Nhập MSNV"
                          {...field}
                          required
                          autoComplete="on"
                        />
                        <InputGroupAddon align="inline-end">
                          <CircleUser />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cccd"
                  render={({ field }) => (
                    // <FormItem>
                    //   <FormLabel className="font-bold">
                    //     <LockKeyhole />
                    //     CCCD:
                    //   </FormLabel>
                    //   <FormControl>
                    //     <Input {...field} required autoComplete="on" />
                    //   </FormControl>
                    //   <FormMessage />
                    // </FormItem>
                    <Field className="gap-1">
                      <FieldLabel htmlFor="cccd">CCCD</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id="cccd"
                          placeholder="Nhập số CCCD"
                          {...field}
                          required
                          autoComplete="on"
                        />
                        <InputGroupAddon align="inline-end">
                          <LockKeyhole />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />
              </div>

              <div className="flex gap-4 justify-center items-center w-full col-span-2 mt-8">
                {/* <Button
                  asChild
                  className="bg-red-500 hover:bg-red-600 cursor-pointer min-w-[100px]"
                  onClick={() => navigate(routers().main.home)}
                >
                  <span>Quay lại</span>
                </Button> */}
                <button
                  disabled={mutation.isPending}
                  type="submit"
                  className="flex justify-center items-center  gap-2 py-2 bg-teal-500 hover:bg-teal-600 w-full rounded-3xl"
                >
                  {mutation.isPending ? (
                    <Loader color="#fff" size={30} className="animate-spin" />
                  ) : (
                    <>
                      <span className="text-white uppercase text-[18px] font-bold">Tra cứu</span>
                      <Search size={30} color="#fff" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Form>
          <div className="h-0.5 bg-gray-300 w-[100px] mx-auto my-5"></div>
          <div className="w-full flex items-center justify-center">
            <div className="flex gap-4">
              <Link
                to="/tao-don"
                className="text-blue-600 bg-blue-100 rounded border-blue-600 border flex items-center gap-2 p-1"
              >
                <ClipboardPenLine /> <span className="font-semibold">Tạo đơn nghỉ phép</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalariesSearch;
