import { Link } from "react-router";
import ENV_CONFIG from "~/lib/env";
import routers from "~/lib/router";
import { checkRole } from "~/lib/utils";
import useAuthStore from "~/stores/auth-store";

function CuttingTableHeaderComponent({ children }: { children?: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center justify-between px-2 py-1 bg-blue-500 text-white">
      <a href={ENV_CONFIG.LARAVEL_URL + "/tocat"}>
        <img src="/images/logo.png" alt="Logo" className="w-10" />
      </a>
      <div className="text-center text-base md:text-2xl uppercase font-bold w-full flex flex-wrap justify-center items-center gap-2">
        <div className="left items-center gap-2 flex">
          <a title="Bán thành phẩm" href={ENV_CONFIG.LARAVEL_URL + "/tocat/btp"}>
            <img src="/images/semi.png" alt="Home" className="w-10" />
          </a>
          <a title="Bàn cắt" href={ENV_CONFIG.LARAVEL_URL + "/tocat/ban-cat"}>
            <img src="/images/report.gif" alt="Home" className="w-10" />
          </a>
          <a title="Thay thân" href={ENV_CONFIG.LARAVEL_URL + "/tocat/thay-than"}>
            <img src="/images/replace.png" alt="Home" className="w-10" />
          </a>
          <a title="Sơ đồ" href={ENV_CONFIG.LARAVEL_URL + "/tocat/so-do"}>
            <img src="/images/diagram.png" alt="Home" className="w-10" />
          </a>
          <a title="Trải vải" href={ENV_CONFIG.LARAVEL_URL + "/tocat/trai-vai"}>
            <img src="/images/testing.png" alt="Home" className="w-10" />
          </a>
          <a title="Kiểm BTP" href={ENV_CONFIG.LARAVEL_URL + "/tocat/kiem-btp"}>
            <img src="/images/sample.png" alt="Home" className="w-10" />
          </a>
        </div>
        <div className="center mx-10 w-full md:w-auto">Báo cáo bàn cắt </div>

        <div className="right flex items-center gap-2">
          {!user || !checkRole("thongkecat") ? (
            <Link to={"/dang-nhap?redirectTo=/tocat/ban-cat"}>
              <img className="w-8" src="/images/login.png" alt="Login" />
            </Link>
          ) : (
            <Link to={routers.cutting.table.add()}>
              <img className="w-8" src="/images/plus.png" alt="Add" />
            </Link>
          )}
          <a
            title="Phiếu theo dõi bàn cắt"
            href={ENV_CONFIG.LARAVEL_URL + "/tocat/ban-cat/phieu-cat"}
          >
            <img className="w-8" src="/images/touch.png" alt="" />
          </a>
          <a title="Mã hàng đã xong" href={ENV_CONFIG.LARAVEL_URL + "/tocat/ban-cat/daxong"}>
            <img className="w-8" src="/images/history.png" alt="" />
          </a>
          {children}
        </div>
      </div>
    </div>
  );
}

export default CuttingTableHeaderComponent;
