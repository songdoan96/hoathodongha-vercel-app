import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
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
import { SalariesSchema, type SalariesSchemaType } from "~/schemas/salaries.schema";

export default function SalariesSearch() {
  const form = useForm<SalariesSchemaType>({
    resolver: zodResolver(SalariesSchema),
    defaultValues: {
      msnv: "",
      cccd: "",
      month: format(new Date(), "yyyy-MM"),
    },
  });

  function onSubmit(values: SalariesSchemaType) {
    console.log("🚀 ~ onSubmit ~ values:", values);
  }
  return (
    <div className="bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 rounded-2xl border shadow-2xl border-blue-500"
        >
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="msnv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MSNV:</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>CCCD:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tháng:</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 justify-center items-center w-full col-span-2">
            <Button
              asChild
              className="bg-red-500 hover:bg-red-600 cursor-pointer"
              // onClick={() => navigate(-1)}
            >
              <span>Quay lại</span>
            </Button>
            <Button
              // disabled={create.isPending}
              type="submit"
              className="bg-teal-500 hover:bg-teal-600"
            >
              Tạo đơn
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
