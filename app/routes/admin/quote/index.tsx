import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { apiQuoteGetAll } from "~/apis/quote.api";
import AdminQuoteCreateComponent from "~/components/Admin/Quote/Create";
import Loading from "~/components/Loading";
import { QUERY_KEY } from "~/lib/queryKey";
import type { QuoteType } from "~/types/quote.type";

export default function AdminQuoteDashboardPage() {
  const { data, isLoading } = useQuery<QuoteType[]>({
    queryKey: [QUERY_KEY.quote.FIND_ALL],
    queryFn: apiQuoteGetAll,
    refetchInterval: 1000 * 60 * 10,
  });
  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <div>
      <AdminQuoteCreateComponent />
      <table>
        <thead>
          <tr>
            <th className="border text-center">STT</th>
            <th className="border text-center">Author</th>
            <th className="border text-center">Content</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((quote) => (
            <tr key={quote.id} className="">
              <td className="border text-center w-8">{quote.id}</td>
              <td className="border text-center w-48">{quote.author}</td>
              <td className="border pl-2">{quote.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
