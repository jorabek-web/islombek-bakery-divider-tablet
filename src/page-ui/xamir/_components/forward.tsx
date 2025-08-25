import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useBakeryRedirectMutation } from "@/integration";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface FormValues {
  zuvala: string;
  drivers: string;
}

export const Forward = ({
  getUsers,
  doughId,
}: {
  getUsers: GetAllUsersResponse[];
  doughId: string;
}) => {
  const [open, setOpen] = useState(false);
  const currentBakery = localStorage.getItem("bakerRoom") || "";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      zuvala: "",
      drivers: "",
    },
  });

  const [bakeryRedirect] = useBakeryRedirectMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await bakeryRedirect({
        id: doughId,
        bakerRoomId: currentBakery,
        transferred_driver: data.drivers,
      });

      console.log(res);
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="flex items-center gap-2 p-2 px-4">
            <img src="/forward.svg" alt="forward" />
            <button className="text-[14px] font-semibold">Uzatish</button>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
              <div className="w-full mb-4">
                <label className="text-[16px] flex justify-start text-[#FFCC15] font-[600] mb-2">
                  Haydovchilar
                </label>
                <Controller
                  name="drivers"
                  control={control}
                  rules={{ required: "Kamida bitta haydovchi tanlang" }}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Bo'luvchi tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {getUsers?.map((user) => (
                            <SelectItem key={user._id} value={user._id}>
                              {user.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.drivers && (
                        <span className="text-red-500 text-sm block mt-1">
                          {errors.drivers.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>
              <Button
                type="submit"
                variant={"yellow"}
                className="text-[16px] font-[600] ml-auto mt-[7px] w-full"
              >
                Yuborish
              </Button>
            </SheetHeader>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
