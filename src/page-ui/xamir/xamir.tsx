import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Forward } from "./_components/forward";
import { useBakeryDoughsQuery, useGetUsersQuery } from "@/integration";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { EditBlank } from "./_components/editBlank";

export const Xamir = () => {
  const currentBakery = localStorage.getItem("bakerRoom") || "{}";
  const { data: getUsers } = useGetUsersQuery(["DRIVER"]);
  const { data: bakeryDoughs } = useBakeryDoughsQuery({ id: currentBakery });

  const [timers, setTimers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = bakeryDoughs?.reduce((acc, item) => {
        const createdAt = new Date(item.updatedAt).getTime();
        const now = Date.now();
        const diff = now - createdAt;

        return {
          ...acc,
          [item._id]: formatTime(diff),
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

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  console.log(bakeryDoughs);

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Xamir"} className="text-white mx-auto" />
        </div>
      </div>
      {bakeryDoughs?.map((item) => (
        <div
          key={item._id}
          className="my-3 rounded-[8px] bg-white p-[10px] border-[1px] border-[#FFCC15] flex items-center justify-between text-[16px] text-[#1C2C57] font-[500]"
        >
          <div className="flex items-center justify-between w-full gap-y-3">
            <p className=" w-1/3">{item.dough_type.title}</p>
            <p className=" w-1/4">
              {format(new Date(item.updatedAt), "HH:mm")}
            </p>
            <p className="bg-[#FFCC15] p-1 rounded-[8px] w-1/4">
              {timers[item._id] || "00:00:00"}
            </p>
            <Popover>
              <PopoverTrigger>
                <BsThreeDotsVertical />
              </PopoverTrigger>
              <PopoverContent className="bg-white border-2 border-[#1C2C57] text-[#1C2C57] rounded-[8px] max-w-max">
                <EditBlank doughId={item._id} />
                <Forward
                  getUsers={getUsers || []}
                  doughId={item.dough_type._id}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};
