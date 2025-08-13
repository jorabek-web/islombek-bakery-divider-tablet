import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useBakeryDivideMutation, useGetUsersQuery } from "@/integration/api";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormValues {
  zuvala: string;
  dividers: string[];
}

export const EditBlank = ({ doughId }: { doughId: string }) => {
  const { data: getUsers } = useGetUsersQuery(["DIVIDER"]);
  const [bakeryDivide, { isLoading: isLoadingDivide }] =
    useBakeryDivideMutation();
  const [open, setOpen] = useState(false);
  const [selectedDividers, setSelectedDividers] = useState<string[]>([]);
  const currentBakery = localStorage.getItem("bakerRoom") || "";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      zuvala: "",
      dividers: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!doughId || !currentBakery || !data || !data.zuvala || !data.dividers)
      return;

    try {
      await bakeryDivide({
        id: doughId,
        bakerRoomId: currentBakery,
        dough_ball_count: Number(data.zuvala),
        divided_by_workers: data.dividers,
      });

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
          <div className="flex items-center gap-2 p-2 px-4 border-b-2 border-[#1C2C57]">
            <img src="/zuvala.svg" alt="zuvala" className="" />
            <button className="text-[14px]  font-semibold">
              Zuvalaga bo'lish
            </button>
          </div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
              <div>
                <label className="text-[16px] flex justify-start text-[#FFCC15] font-[600]">
                  Zuvala
                </label>
                <Controller
                  name="zuvala"
                  control={control}
                  rules={{ required: "Zuvala miqdorini kiriting" }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        className="p-1 border border-[#FFCC15] rounded-[8px] outline-none w-full"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.zuvala && (
                        <span className="text-red-500 text-sm">
                          {errors.zuvala.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="mt-4">
                <label className="text-[16px] flex justify-start text-[#FFCC15] font-[600] mb-2">
                  Bo'luvchilar
                </label>
                <Controller
                  name="dividers"
                  control={control}
                  rules={{ required: "Kamida bitta bo'luvchi tanlang" }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Select
                        onValueChange={(value) => {
                          const newSelected = selectedDividers.includes(value)
                            ? selectedDividers.filter((id) => id !== value)
                            : [...selectedDividers, value];

                          setSelectedDividers(newSelected);
                          field.onChange(newSelected);
                        }}
                      >
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="Bo'luvchi tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          {getUsers?.map((user) => (
                            <SelectItem
                              key={user._id}
                              value={user._id}
                              className={
                                selectedDividers.includes(user._id)
                                  ? "bg-[#FFCC15]/10"
                                  : ""
                              }
                            >
                              {user.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex flex-wrap gap-2">
                        {selectedDividers.map((dividerId) => {
                          const divider = getUsers?.find(
                            (u) => u._id === dividerId
                          );
                          return (
                            <Badge
                              key={dividerId}
                              variant="secondary"
                              className="bg-[#FFCC15] text-[#1C2C57]"
                            >
                              {divider?.fullName}
                              <button
                                type="button"
                                className="ml-1 hover:text-red-500"
                                onClick={() => {
                                  const newSelected = selectedDividers.filter(
                                    (id) => id !== dividerId
                                  );
                                  setSelectedDividers(newSelected);
                                  field.onChange(newSelected);
                                }}
                              >
                                ×
                              </button>
                            </Badge>
                          );
                        })}
                      </div>

                      {errors.dividers && (
                        <span className="text-red-500 text-sm">
                          {errors.dividers.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>

              <Button
                type="submit"
                variant={"yellow"}
                className="text-[16px] font-[600] mx-auto mt-[7px] w-full"
                disabled={isLoadingDivide}
              >
                {isLoadingDivide ? "Yuklanmoqda..." : "Yuborish"}
              </Button>
            </SheetHeader>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
