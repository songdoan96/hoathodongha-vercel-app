import { memo, useState } from "react";
import { type AuthStoreType } from "~/stores/auth-store";
import type { FormType } from "~/types/form.type";
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
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function FormTT({
  form,
  user,
  mutationSignature,
}: {
  form: FormType;
  user: AuthStoreType;
  mutationSignature: any;
}) {
  const [replace, setReplace] = useState<string>(() => (form.thaythe === true ? "true" : "false"));

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="underline" variant="link">
          Ký đơn
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ký đơn</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <RadioGroup
              onValueChange={(value) => setReplace(value)}
              defaultValue={replace}
              className="mt-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="thaythetrue" />
                <Label htmlFor="thaythetrue" className="text-green-700">
                  Đã bố trí thay thế
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="thaythefalse" />
                <Label htmlFor="thaythefalse" className="text-red-700">
                  Chưa bố trí thay thế
                </Label>
              </div>
            </RadioGroup>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutationSignature.mutate({
                id: form.id.toString(),
                values: {
                  hoten: user?.name,
                  chucvu: "totruong",
                  thaythe: replace === "true" ? true : false,
                },
              });
            }}
          >
            Ký đơn
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default memo(FormTT);
