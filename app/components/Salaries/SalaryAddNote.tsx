import React, { useState } from "react";
import { useSalaryCreateChat } from "~/hooks/salaries-hook";
import type { SalariesType } from "~/types/salaries-type";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SalaryAddNote({ salary }: { salary: SalariesType }) {
  const [chat, setChat] = useState("");
  const mutationCreateNote = useSalaryCreateChat();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chat) {
      mutationCreateNote.mutate({
        chat,
        salaryId: salary.id,
      });
      setChat("");
    }
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full py-4">
      <p className="text-red-700 text-sm md:text-base text-center">
        Lưu ý: Nếu CBCNV nào có thắc mắc vui lòng nhập nội dung vào bên dưới để khiếu nại.
      </p>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <Input
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          type="text"
          required
          className="border border-blue-500"
        />
        <Button type="submit">Phản hồi</Button>
      </form>
      <div className="mt-2 text-left w-full">
        {salary.salaryNotes?.map((note, idx) => (
          <div key={note.id} className="text-red-700 text-sm">
            {idx + 1}. {note.chat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalaryAddNote;
