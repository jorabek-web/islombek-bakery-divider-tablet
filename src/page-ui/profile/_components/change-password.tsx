import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUpdatePasswordMutation } from "@/integration/api/authApi";
import { useStorage } from "@/utils";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLock } from "react-icons/md";

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePassword = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isEyePasswordVisible, setIsEyePasswordVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordForm> = async (data) => {
    if (
      !data ||
      !data.oldPassword ||
      !data.newPassword ||
      !data.confirmPassword
    )
      return;

    if (data.newPassword !== data.confirmPassword) {
      console.error("Parolni tasdiqlashda xatolik !");
      return;
    }

    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      setIsOpen(false);
      setIsEyePasswordVisible({});
      useStorage.removeCredentials();
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="w-full">
          <div className="rounded-[8px] p-[10px] bg-white flex items-center gap-[7px] ">
            <MdLock size={25} />
            <p className="text-[14px] font-[900]">
              Profil parolini o'zgartirish
            </p>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5 w-full">
                <div>
                  <div className="w-full h-10 bg-white rounded-lg relative flex justify-between">
                    <Controller
                      name="oldPassword"
                      control={control}
                      rules={{ required: "Eski parol kiritish majburiy!" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Eski parol"
                          type={
                            isEyePasswordVisible["oldPassword"]
                              ? "text"
                              : "password"
                          }
                          className="outline-none w-full h-full bg-transparent border-0 focus-visible:ring-0"
                        />
                      )}
                    />
                    <div
                      onClick={() =>
                        setIsEyePasswordVisible((prev) => ({
                          ...prev,
                          oldPassword: !prev["oldPassword"],
                        }))
                      }
                      className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent"
                    >
                      {isEyePasswordVisible["oldPassword"] ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                  </div>
                  {errors.oldPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="w-full h-10 bg-white rounded-lg relative flex justify-between">
                    <Controller
                      name="newPassword"
                      control={control}
                      rules={{ required: "Yangi parol kiritish majburiy!" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Yangi parol"
                          type={
                            isEyePasswordVisible["newPassword"]
                              ? "text"
                              : "password"
                          }
                          className="outline-none w-full h-full bg-transparent border-0 focus-visible:ring-0"
                        />
                      )}
                    />
                    <div
                      onClick={() =>
                        setIsEyePasswordVisible((prev) => ({
                          ...prev,
                          newPassword: !prev["newPassword"],
                        }))
                      }
                      className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent"
                    >
                      {isEyePasswordVisible["newPassword"] ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="w-full h-10 bg-white rounded-lg relative flex justify-between">
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{ required: "Parolni tasdiqlash majburiy!" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Parolni tasdiqlash"
                          type={
                            isEyePasswordVisible["confirmPassword"]
                              ? "text"
                              : "password"
                          }
                          className="outline-none w-full h-full bg-transparent border-0 focus-visible:ring-0"
                        />
                      )}
                    />
                    <div
                      onClick={() =>
                        setIsEyePasswordVisible((prev) => ({
                          ...prev,
                          confirmPassword: !prev["confirmPassword"],
                        }))
                      }
                      className="cursor-pointer w-10 h-full flex items-center justify-center bg-transparent"
                    >
                      {isEyePasswordVisible["confirmPassword"] ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant={"yellow"}
                  className="text-[16px] font-[600] ml-auto mt-[15px] w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
              </div>
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
