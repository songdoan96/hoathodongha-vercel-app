import { format, formatDate } from "date-fns";
import {
  CheckCircle,
  ChevronsRight,
  CircleXIcon,
  Clock,
  History,
  Square,
  SquareCheck,
  Trash2,
  X,
} from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";
import { useFormsDelete, useFormsSignature, useFormsUpdate } from "~/hooks/forms-hook";
import { checkFive5Minutes, checkRole, diffHoursOut } from "~/lib/helpers";
import routers from "~/lib/routers";
import { cn } from "~/lib/utils";
import { linesList } from "~/lib/variables";
import useAuthStore from "~/stores/auth-store";
import type { FormsType } from "~/types/forms-type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

function FormTRow({ form, count }: { form: FormsType; count: number }) {
  const { user } = useAuthStore();
  const deleteForm = useFormsDelete();
  const updateForm = useFormsUpdate();
  const updateFormSignature = useFormsSignature();
  const needToTruong = linesList.find((line) => line.value === form.to)?.needToTruong;
  const needQuanDoc = linesList.find((line) => line.value === form.to)?.needQuanDoc;
  return (
    <tr
      key={form.id}
      className={form.chuaxong && checkRole("tochuc") ? "bg-red-100 z-50" : "bg-white"}
    >
      <td className="p-1 border border-black text-center" title={`${form.id}`}>
        {checkRole("tochuc") ? (
          <Link className="underline font-bold" to={routers().forms.edit(form.id)}>
            {format(form.ngaytao, "dd/MM")}
          </Link>
        ) : (
          <>{format(form.ngaytao, "dd/MM")}</>
        )}
      </td>
      <td className="p-1 border border-black bg-white md:bg-transparent sticky left-0 min-w-16 max-w-52">
        {form.hoten}
      </td>
      <td className="p-1 border border-black bg-white md:bg-transparent sticky left-16 min-w-12 text-center">
        {linesList.find((line) => line.value == form.to)?.name}
      </td>
      <td className="p-1 border border-black text-center">{form.msnv}</td>
      <td className="p-1 border border-black">
        <div className="flex justify-center items-center">
          {form.loaidon === "leave" ? (
            <Link
              to={routers().forms.view(form.id)}
              className="inline-block text-center font-semibold min-w-20 text-teal-100 bg-teal-500 p-1 rounded"
            >
              Nghỉ phép
            </Link>
          ) : (
            <Link
              to={routers().forms.view(form.id)}
              className="inline-block text-center font-semibold min-w-20 text-pink-100 bg-pink-500 p-1 rounded"
            >
              Ra cổng
            </Link>
          )}
        </div>
      </td>
      <td className="p-1 border border-black">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 mx-auto rounded-full text-white bg-red-500",
            {
              "bg-green-500": count === 1,
              "bg-yellow-500": count === 2,
            }
          )}
        >
          {form.msnv.length === 4 ? (
            <Link
              to={{
                pathname: routers().forms.detail,
                search: `?month=${format(form.ngaytao, "yyyy-MM")}&msnv=${form.msnv}`,
              }}
              className="text-center font-bold"
            >
              {count}
            </Link>
          ) : (
            count
          )}
        </div>
      </td>
      <td className="p-1 border border-black min-w-28">
        {form.loaidon == "leave" ? (
          <div className="text-center">
            <p className="font-bold text-teal-500">{form.songaynghi} ngày</p>
            <p>
              ( {form.tungay && formatDate(form.tungay, "dd/MM")} -
              {form.denngay && formatDate(form.denngay, "dd/MM")} )
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="font-bold text-pink-500">{`${form.tugio} - ${form.dengio}`}</p>
            <p>(ngày {form.rangay && formatDate(form.rangay, "dd/MM")})</p>
          </div>
        )}
      </td>
      <td className="p-1 border border-black">{form.lydo}</td>
      <td className="p-1 border border-black">
        <div className="flex justify-center items-center">
          {form.thaythe ? <CheckCircle color="green" /> : <CircleXIcon color="red" />}
        </div>
      </td>
      <td className="p-1 border border-black max-w-36">
        <div className="flex items-center justify-center text-center">
          {form.totruong ? (
            form.totruong
          ) : (
            <>
              {!form.totruong && needToTruong && <X color="red" size={20} />}
              {user && user.bophan === form.to && (
                <Button
                  className="underline"
                  onClick={() =>
                    updateFormSignature.mutate({
                      id: form.id,
                      formData: {
                        hoten: user.name,
                        chucvu: "totruong",
                      },
                    })
                  }
                  variant="link"
                >
                  Ký đơn
                </Button>
              )}
            </>
          )}
        </div>
      </td>
      <td className="p-1 border border-black">
        <div className="flex items-center justify-center text-center">
          {!form.quandoc && needQuanDoc && <X color="red" size={20} />}
          {form.quandoc
            ? form.quandoc
            : user &&
              user.bophan?.includes("quandoc") &&
              ((needToTruong && needQuanDoc && form.totruong) || (!needToTruong && needQuanDoc)) &&
              user.bophan.startsWith(form.to.split("_")[0]) && (
                <Button
                  className="underline"
                  onClick={() =>
                    updateFormSignature.mutate({
                      id: form.id,
                      formData: {
                        hoten: user.name,
                        chucvu: "quandoc",
                      },
                    })
                  }
                  variant="link"
                >
                  Ký đơn
                </Button>
              )}
        </div>
      </td>
      <td className="p-1 border border-black">
        <div className="flex items-center justify-center text-center">
          {!form.lanhdao && <X color="red" size={20} />}
          {form.giamdocky
            ? form.lanhdao
              ? form.lanhdao
              : user &&
                user.bophan === "giamdoc" &&
                ((!needToTruong && !needQuanDoc) ||
                  (needToTruong && needQuanDoc && form.quandoc) ||
                  (needToTruong && !needQuanDoc && form.totruong) ||
                  (!needToTruong && needQuanDoc && form.quandoc)) && (
                  <Button
                    className="underline"
                    onClick={() =>
                      updateFormSignature.mutate({
                        id: form.id,
                        formData: {
                          hoten: user.name,
                          chucvu: "lanhdao",
                        },
                      })
                    }
                    variant="link"
                  >
                    Ký đơn
                  </Button>
                )
            : form.lanhdao
              ? form.lanhdao
              : user &&
                (user.bophan === "lanhdao" || user.bophan === "giamdoc") &&
                ((!needToTruong && !needQuanDoc) ||
                  (needToTruong && needQuanDoc && form.quandoc) ||
                  (needToTruong && !needQuanDoc && form.totruong) ||
                  (!needToTruong && needQuanDoc && form.quandoc)) && (
                  <Button
                    className="underline"
                    onClick={() =>
                      updateFormSignature.mutate({
                        id: form.id,
                        formData: {
                          hoten: user.name,
                          chucvu: "lanhdao",
                        },
                      })
                    }
                    variant="link"
                  >
                    Ký đơn
                  </Button>
                )}
          {/* {form.lanhdao
            ? form.lanhdao
            : user &&
              user.bophan === "lanhdao" &&
              ((!needToTruong && !needQuanDoc) ||
                (needToTruong && needQuanDoc && form.quandoc) ||
                (needToTruong && !needQuanDoc && form.totruong) ||
                (!needToTruong && needQuanDoc && form.quandoc)) && (
                <Button
                  className="underline"
                  onClick={() =>
                    updateFormSignature.mutate({
                      id: form.id,
                      formData: {
                        hoten: user.name,
                        chucvu: "lanhdao",
                      },
                    })
                  }
                  variant="link"
                >
                  Ký đơn
                </Button>
              )} */}
        </div>
      </td>
      <td className="border border-black">
        {form.loaidon === "out" && (
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center justify-center gap-1 line-clamp-1">
              <span className="text-blue-500 font-bold">
                {form.giora || <History color="red" size={18} />}
              </span>
              <ChevronsRight size={14} />
              <span className="text-blue-500 font-bold">
                {form.giovao || <History color="red" size={18} />}
              </span>
            </div>
            {form.giora && (
              <div className="flex justify-center items-center font-bold gap-1">
                <Clock size={14} />
                <span>{diffHoursOut(form.giora, form.giovao).toFixed(1) + "h"}</span>
              </div>
            )}
          </div>
        )}
      </td>
      <td className="p-1 border border-black">
        <div className="flex justify-center items-center gap-1">
          {(checkFive5Minutes(form.ngaytao) || checkRole("tochuc")) && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 color="red" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
                  <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => deleteForm.mutate(form.id)}
                  >
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {checkRole("tochuc") && (
            <button
              onClick={() =>
                updateForm.mutate({
                  id: form.id.toString(),
                  formData: { chuaxong: !form.chuaxong },
                })
              }
            >
              {form.chuaxong ? (
                <Square color="red" size={20} />
              ) : (
                <SquareCheck color="green" size={20} />
              )}
            </button>
          )}
        </div>
      </td>
      {/* {checkRole("tochuc") && (
        <td className="p-1 border border-black">
          <div className="flex justify-center items-center gap-1">
            <button
              onClick={() =>
                updateForm.mutate({
                  id: form.id.toString(),
                  formData: { chuaxong: !form.chuaxong },
                })
              }
            >
              {form.chuaxong ? (
                <Square color="red" size={20} />
              ) : (
                <SquareCheck color="green" size={20} />
              )}
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 color="red" size={20} />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
                  <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => deleteForm.mutate(form.id)}
                  >
                    Xóa
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </td>
      )} */}
    </tr>
  );
}
// export default FormTRow;
export default memo(FormTRow);
