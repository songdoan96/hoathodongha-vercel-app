import { SendHorizonal } from "lucide-react";
import React, { useState } from "react";
import { useSalaryCreateChat } from "~/hooks/salaries-hook";
import { Input } from "../ui/input";

export default function SalaryFeedbackFormComponent({
  id,
  isEmployee = true,
}: {
  id: string;
  isEmployee?: boolean;
}) {
  const [chat, setChat] = useState("");
  const mutationCreateNote = useSalaryCreateChat();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chat) {
      mutationCreateNote.mutate({
        chat,
        salaryId: id,
        isEmployee,
      });
      setChat("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        value={chat}
        type="text"
        required
        className="h-10 border-black w-full"
        onChange={(e) => setChat(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 w-10 h-10 flex justify-center items-center rounded"
      >
        <SendHorizonal size={24} color="#fff" />
      </button>
    </form>
  );
}
