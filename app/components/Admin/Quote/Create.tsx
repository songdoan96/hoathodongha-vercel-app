import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { apiQuoteCreate } from "~/apis/quote.api";
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
import { QUERY_KEY } from "~/lib/queryKey";
import type { QuoteType } from "~/types/quote.type";
const formSchema = z.object({
  content: z.string().min(1, "Tài khoản không được trống."),
  author: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

export default function AdminQuoteCreateComponent() {
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      author: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (formData: Pick<QuoteType, "author" | "content">) => apiQuoteCreate(formData),
    onSuccess: async (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.quote.FIND_ALL] });
      form.reset();
    },
    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu chưa đúng");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <div className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 border p-4 w-full"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trích dẫn</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tác giả</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-end items-center w-full">
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 btn"
            >
              {mutation.isPending && <LoaderIcon className="animate-spin" />} Thêm mới
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
