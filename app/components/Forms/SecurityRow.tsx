import { formatDate } from "date-fns";
import { ChevronsRight, X } from "lucide-react";
import { useState } from "react";
import { useFormsSecurityUpdate } from "~/hooks/forms-hook";
import { cn } from "~/lib/utils";
import { linesList } from "~/lib/variables";
import type { FormsType } from "~/types/forms-type";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function FormSecurityRowComponent({ form }: { form: FormsType }) {
  const update = useFormsSecurityUpdate();
  const [gioRa, setGioRa] = useState<string>();
  const [gioVao, setGioVao] = useState<string>();
  const needToTruong = linesList.find((line) => line.value === form.to)?.needToTruong;
  const needQuanDoc = linesList.find((line) => line.value === form.to)?.needQuanDoc;

  return (
    <tr key={form.id} className="bg-white" title={`${form.id}`}>
      <td className="p-2 border border-black text-left font-bold bg-white md:bg-transparent sticky left-0 min-w-16">
        {form.hoten}
      </td>
      <td className="p-2 border border-black bg-white md:bg-transparent sticky left-16 min-w-12 text-center">
        {linesList.find((line) => line.value == form.to)?.name}
      </td>
      <td className="p-2 border border-black text-center">{form.msnv}</td>
      <td className="p-2 border border-black text-center text-red-500 font-bold">
        {form.rangay && formatDate(form.rangay, "dd/MM")}
      </td>
      <td className="p-2 border border-black text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="text-blue-500 font-bold">{form.tugio}</span>
          <ChevronsRight size={14} />
          <span className="text-blue-500 font-bold">{form.dengio}</span>
        </div>
      </td>
      <td className="p-2 border border-black text-center">{form.lydo}</td>
      <td className="p-2 border border-black text-center">
        <div className="flex justify-center items-center">
          {!form.totruong && needToTruong && <X color="red" size={20} />}
          {form.totruong}
        </div>
      </td>
      <td className="p-2 border border-black text-center">
        <div className="flex justify-center items-center">
          {!form.quandoc && needQuanDoc && <X color="red" size={20} />}
          {form.quandoc}
        </div>
      </td>
      <td
        className={cn("p-2 border border-black text-center", {
          "bg-red-100": form.giamdocky,
        })}
      >
        <div className="flex justify-center items-center">
          {!form.lanhdao && <X color="red" size={20} />}
          {form.lanhdao}
        </div>
      </td>
      <td className="p-2 border border-black text-center">
        {form.giora ? (
          form.giora
        ) : (
          <div className="flex gap-1">
            <Input type="time" className="w-28" onChange={(e) => setGioRa(e.target.value)} />
            {gioRa && (
              <Button
                className="p-2"
                onClick={() => {
                  update.mutate({
                    id: form.id,
                    formData: {
                      giora: gioRa,
                    },
                  });
                }}
              >
                Cập nhật
              </Button>
            )}
          </div>
        )}
      </td>
      <td className="p-2 border border-black text-center">
        {form.giovao ? (
          form.giovao
        ) : (
          <div className="flex gap-1">
            <Input type="time" className="w-28" onChange={(e) => setGioVao(e.target.value)} />
            {gioVao && (
              <Button
                className="p-2"
                onClick={() => {
                  update.mutate({
                    id: form.id,
                    formData: {
                      giovao: gioVao,
                    },
                  });
                }}
              >
                Cập nhật
              </Button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
