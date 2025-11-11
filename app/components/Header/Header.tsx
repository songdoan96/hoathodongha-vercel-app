import type { ReactNode } from "react";
import { Link } from "react-router";
import imagesPath from "~/lib/images-path";

function HeaderComponent({
  logoLink,
  children,
  handleClick,
}: {
  logoLink?: string;
  children?: ReactNode;
  handleClick?: () => void;
}) {
  return (
    <div className="bg-blue-600 px-2 py-1 shadow-sm relative flex items-center">
      <Link onClick={handleClick} to={logoLink ?? "/"} className="z-50">
        <img className="w-10" src={imagesPath.logo} alt="" />
      </Link>
      {children}
    </div>
  );
}

export default HeaderComponent;
