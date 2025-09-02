import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { useDivideQuery, useGetUsersQuery } from "@/integration";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { EditBlank, Forward } from "./_components";

export const Zuvala = () => {
  const currentBakery = localStorage.getItem("bakerRoom") || "";
  const { data: getUsers } = useGetUsersQuery(["DRIVER"]);
  // const [getUser] = useLazyGetUserQuery();
  const { data: divide } = useDivideQuery({ id: currentBakery });

  const [timers, setTimers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = divide?.reduce((acc, item) => {
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
  }, [divide]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

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
          <Title text={"Zuvala"} className="text-white mx-auto" />
        </div>
      </div>
      <div className="space-y-5">
        {divide?.map((item) => (
          <div
            key={item?._id}
            className="mt-[60px] rounded-[8px] bg-white p-[10px] border-[1px] border-[#FFCC15] text-[#1C2C57]"
          >
            <div className="flex items-start gap-2 justify-between">
              <div className="flex flex-col gap-2 justify-between h-full w-2/3">
                <p
                  key={item._id}
                  className="text-[20px] break-words font-[700]"
                >
                  {item.doughBallInfo.divided_by_workers &&
                  item.doughBallInfo.divided_by_workers.length > 0
                    ? item.doughBallInfo.divided_by_workers
                        .map((worker) => worker.fullName)
                        .join("/")
                        .slice(0)
                    : "mavjud emas"}
                </p>

                <p>{item?.doughBallInfo.dough_ball_count} ta zuvala</p>
              </div>

              <div className="flex flex-col gap-2 justify-between h-full w-1/3">
                <p className="text-[20px] break-words font-[600]">
                  {item.dough_type.title}
                </p>

                <p className="bg-[#FFCC15] p-1 rounded-[8px] max-w-max">
                  {timers[item._id] || "00:00:00"}
                </p>
              </div>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <BsThreeDotsVertical />
                  </PopoverTrigger>
                  <PopoverContent className="bg-white border-2 border-[#1C2C57] text-[#1C2C57] rounded-[8px] max-w-max">
                    <EditBlank
                      doughId={item._id}
                      doughCount={item.doughBallInfo.dough_ball_count}
                    />

                    <Forward getUsers={getUsers || []} doughId={item._id} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
