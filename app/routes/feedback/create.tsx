import { useMutation } from "@tanstack/react-query";
import {
  AudioLines,
  Heart,
  Mail,
  MessageSquare,
  PenSquare,
  Send,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import apiClient from "~/lib/api-client";

export default function create() {
  const [formData, setFormData] = useState({
    content: "",
  });
  const mutation = useMutation({
    mutationFn: (formData: { content: string }) => {
      return apiClient.post("/feedbacks", formData);
    },
    onSuccess: () => {
      setFormData({ content: "" });
      toast.success("Cảm ơn bạn đã gửi góp ý!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <main className="grow">
        <div className="max-w-4xl mx-auto p-2">
          {/* Hero Section */}
          <section className="relative mb-12 flex flex-col md:flex-row items-center gap-8 bg-linear-to-br from-blue-50 to-white p-2 md:p-8 rounded-3xl overflow-hidden shadow-sm border border-blue-100">
            <div className="flex-1 z-10 text-center md:text-left">
              <p className="text-red-500 text-lg leading-relaxed mb-4 uppercase font-semibold">
                Công ty May Hòa Thọ Đông Hà
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#004494] leading-tight">
                HÒM THƯ <br />
                GÓP Ý ĐIỆN TỬ
              </h2>
            </div>

            <div className="flex-1 flex justify-center items-center relative">
              {/* Illustration Placeholder representing the blue box */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="relative w-48 h-56 bg-[#0056b3] rounded-2xl shadow-2xl flex flex-col items-center pt-8 overflow-hidden transform -rotate-3">
                  <div className="w-32 h-2 bg-[#004494] rounded-full mb-8"></div>
                  <div className="text-white font-black text-2xl mb-4 tracking-widest opacity-80 uppercase">
                    GÓP Ý
                  </div>
                  <MessageSquare className="w-12 h-12 text-white opacity-90 fill-white" />
                  <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full"></div>
                  <div className="absolute -left-8 bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
                </div>
                <div className="absolute top-0 right-4 bg-white p-3 rounded-2xl shadow-lg">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div className="absolute bottom-8 -left-2 bg-white/80 backdrop-blur p-2 rounded-xl shadow-md">
                  <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-2 md:p-8 py-4 mb-10 shadow-sm border border-slate-100">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-lg text-[#0056b3]">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#004494] uppercase tracking-wide">
                Mục đích
              </h3>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4 items-center">
                <div className="p-2.5 bg-blue-600 text-white rounded-full mt-1 shrink-0">
                  <AudioLines className="w-5 h-5" />
                </div>
                <p className="text-slate-700 text-lg">
                  Nhằm lắng nghe, tiếp nhận và cải thiện chất lượng môi trường làm việc.
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="p-2.5 bg-blue-600 text-white rounded-full mt-1 shrink-0">
                  <PenSquare className="w-5 h-5" />
                </div>
                <p className="text-slate-700 text-lg">
                  Ghi nhận mọi ý kiến, đề xuất, phản ánh hoặc sáng kiến cải tiến trong công việc.
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-2.5 bg-blue-600 text-white rounded-full mt-1 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-slate-700 text-lg">
                  Tạo cầu nối giữa Ban lãnh đạo và toàn thể nhân viên để cùng nhau xây dựng môi
                  trường làm việc tích cực, thân thiện và hiệu quả hơn.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <div className="bg-blue-50 p-2 rounded-2xl flex flex-col gap-2 items-center">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <p className="text-slate-600 leading-relaxed text-center">
                  *** Mọi ý kiến đều được{" "}
                  <span className="text-[#0056b3] font-bold italic">
                    bảo mật tuyệt đối danh tính và xử lý nghiêm túc
                  </span>{" "}
                  bởi Ban Giám đốc. ***
                  <br />
                </p>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-slate-100 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[#0056b3]">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#004494] uppercase tracking-wide">
                Gửi góp ý
              </h3>
            </div>

            <p className="text-slate-500 mb-8">
              Vui lòng nhập nội dung góp ý ở bên dưới.
              <br /> Nhấn <span className="font-bold text-slate-700">'Gửi'</span> để hoàn tất việc
              gửi ý kiến.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute top-4 left-4 text-slate-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <textarea
                  placeholder="Nội dung góp ý *"
                  required
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 min-h-[150px]"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0056b3] hover:bg-[#004494] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wide"
                disabled={mutation.isPending}
              >
                <Send className="w-5 h-5" />
                Gửi
              </button>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-50 py-6 border-t border-blue-100 flex items-center justify-center gap-2 px-4 text-center">
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        <p className="text-[#0056b3] font-medium text-lg leading-tight">
          Cùng nhau xây dựng môi trường làm việc tốt đẹp hơn mỗi ngày!
        </p>
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
      </footer>
    </div>
  );
}
