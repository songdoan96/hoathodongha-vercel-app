import type { ReactNode } from "react";

function HeaderTitle({ children }: { children: ReactNode }) {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
      <h1 className="text-white uppercase text-lg md:text-2xl font-bold">
        {children ?? "Hòa Thọ Đông Hà"}
      </h1>
    </div>
  );
}

export default HeaderTitle;
