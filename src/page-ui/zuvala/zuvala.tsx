import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { useBakeryBakeMutation, useBakeryDoughsQuery, useGetUsersQuery, useProfileQuery } from "@/integration";
import { ProfileResponse } from "@/integration/api/authApi/types";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Forward } from "../xamir/_components/forward";
import { EditBlank } from "./_components";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Controller, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";


export const Zuvala = () => {
  const currentBakery = JSON.parse(localStorage.getItem("currentBakery") || "{}")
  const { data: getUsers } = useGetUsersQuery(["DRIVER"])
  const { data: bakeryDoughs } = useBakeryDoughsQuery({ bakeryId: currentBakery?.id, status: ["DIVIDED"] })

  const [timers, setTimers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = bakeryDoughs?.reduce((acc, item) => {
        const createdAt = new Date(item.updatedAt).getTime();
        const now = Date.now();
        const diff = now - createdAt;

        return {
          ...acc,
          [item._id]: formatTime(diff)
        };
      }, {});

      setTimers(newTimers || {});
    }, 1000);

    return () => clearInterval(interval);
  }, [bakeryDoughs]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Zuvala"} className="text-white mx-auto" />
        </div>
      </div>
      {bakeryDoughs?.map((item) => (
        <div key={item?._id} className="mt-[60px] rounded-[8px] bg-white p-[10px] border-[1px] border-[#FFCC15] text-[#1C2C57]">
          <p className="text-[20px] break-words font-[700]">{item?.dividers?.map((divider: ProfileResponse) => divider?.fullName).join("/ ")}</p>
          <div className="flex items-center justify-between text-[14px] font-[600]">
            <p>{item?.rounds} ta zuvala</p>
            <p className="bg-[#FFCC15] p-1 rounded-[8px]">{timers[item._id] || '00:00:00'}</p>
            <Popover>
              <PopoverTrigger>
                <BsThreeDotsVertical />
              </PopoverTrigger>
              <PopoverContent className="bg-white border-2 border-[#1C2C57] text-[#1C2C57] rounded-[8px] max-w-max">
                {localStorage.getItem("ROLE") === "BAKER" && <BakedOven id={item?._id} />}
                {localStorage.getItem("ROLE") === "DIVIDER" && <EditBlank doughId={item._id} />}
                {localStorage.getItem("ROLE") === "DIVIDER" && <Forward getUsers={getUsers || []} doughId={item._id} />}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

interface FormValues {
  bake: string;
  dividers: string[];
}

function BakedOven({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [bakeryBake, {isLoading}] = useBakeryBakeMutation()
  const { data: profile } = useProfileQuery({})

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      bake: "",
      // dividers: [],
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await bakeryBake({ dough: id, baked: +data.bake, baker:  profile?._id})
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
            <FaEdit size={25} className="text-[#1C2C57]" />
            <button className="text-[14px] font-semibold">Tandirga yopish</button>
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
                  Tandirga yopish
                </label>
                <Controller
                  name="bake"
                  control={control}
                  rules={{ required: "Zuvala miqdorini kiriting" }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        className="p-1 border border-[#FFCC15] rounded-[8px] outline-none w-full"
                      />
                      {errors.bake && (
                        <span className="text-red-500 text-sm">{errors.bake.message}</span>
                      )}
                    </>
                  )}
                />
              </div>

              {/* <div className="mt-4">
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
                            ? selectedDividers.filter(id => id !== value)
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
                              className={selectedDividers.includes(user._id) ? "bg-[#FFCC15]/10" : ""}
                            >
                              {user.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex flex-wrap gap-2">
                        {selectedDividers.map((dividerId) => {
                          const divider = getUsers?.find(u => u._id === dividerId);
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
                                  const newSelected = selectedDividers.filter(id => id !== dividerId);
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
              </div> */}

              <Button
                type="submit"
                variant={"yellow"}
                className="text-[16px] font-[600] mx-auto mt-[7px] w-full"
                disabled={isLoading}
              >
                {isLoading ? "Yuklanmoqda..." : "Yuborish"}
              </Button>
            </SheetHeader>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}