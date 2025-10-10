import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { apiCuttingTableCreate } from "~/apis/cutting.api";
import CuttingTableHeaderComponent from "~/components/Cutting/Table/Header";
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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import routers from "~/lib/router";
import type { CuttingTableType } from "~/types/cutting";

const formSchema = z.object({
  customer: z.string().min(1, "Khách hàng không được trống."),
  style: z.string().min(1, "Mã hàng không được trống."),
  type: z.string().min(1, "Loại vải không được trống."),
  itemCode: z.string().optional(),
  batch: z.string().min(1, "Đợt không được trống."),
  color: z.string().min(1, "Màu không được trống."),
  isMeter: z.boolean().optional(),
  isShirt: z.boolean().optional(),
  rate: z.string().optional(),
  isFinished: z.boolean().optional(),
  sizes: z.array(
    z.object({
      size: z.string().min(1, "Không được trống."),
      qty: z.number().min(1, "Không được trống."),
    })
  ),
});
type FormValues = z.infer<typeof formSchema>;

function CuttingTableDashboardAdd() {
  let navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      style: "",
      type: "",
      itemCode: "",
      batch: "",
      color: "",
      isMeter: true,
      isShirt: true,
      rate: "0",
      isFinished: false,
      sizes: [{ size: "", qty: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({ name: "sizes", control: form.control });

  const mutation = useMutation({
    mutationFn: (values: Partial<CuttingTableType>) => apiCuttingTableCreate(values),
    onSuccess: () => {
      toast.success("Tạo thành công");
      navigate(routers.cutting.table.index());
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      ...values,
      rate: Number(values.rate),
    });
  }
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CuttingTableHeaderComponent />
      <div className="form p-4 w-2/3 mx-auto border">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-4 gap-4 items-start"
          >
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khách hàng</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã hàng</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại vải</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="itemCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đợt</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Màu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isMeter"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Đơn vị</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={String(field.value)}
                      className="flex justify-around items-center h-full pt-4"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Met</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">Yard</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isShirt"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Áo/Quần</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === "true")}
                      value={String(field.value)}
                      className="flex justify-around items-center h-full pt-4"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Áo</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">Quần</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Định mức</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} step="any" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel className="col-span-5 col-start-1 p-2 border-t bg-gray-100">
              <p className="w-full text-center uppercase font-bold">Size/Số lượng</p>
              <button type="button" onClick={() => append({ size: "", qty: 0 })}>
                <img className="w-10" src="/images/plus.png" alt="Plus" />
              </button>
            </FormLabel>
            <div className="w-full col-span-5 grid grid-cols-3 gap-8 col-start-1 items-start">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 border p-2 bg-gray-50 items-start">
                  <FormField
                    control={form.control}
                    name={`sizes.${index}.size`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sizes.${index}.qty`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số lượng</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="h-full flex-1 mt-auto">
                    <X
                      color="red"
                      size={30}
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-end items-center w-full col-span-5">
              <Link to={routers.cutting.table.index()} className="bg-red-500 btn">
                Quay lại
              </Link>
              <Button
                // disabled={mutation.isPending}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 btn"
              >
                {/* {mutation.isPending && <LoaderIcon className="animate-spin" />}  */}
                Thêm mới
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CuttingTableDashboardAdd;
