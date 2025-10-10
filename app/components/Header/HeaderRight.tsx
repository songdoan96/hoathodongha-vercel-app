import type { ReactNode } from "react";

function HeaderRight({ children }: { children: ReactNode }) {
  return <div className="ml-auto z-50 flex gap-4 text-white">{children}</div>;
}

export default HeaderRight;
