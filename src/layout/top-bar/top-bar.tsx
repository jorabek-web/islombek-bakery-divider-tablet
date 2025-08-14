import { useBakeryQuery } from "@/integration";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

type BakerRoom = {
  title: string;
};

export const TopBar = () => {
  const [bakerRoom, setBakerRoom] = useState<BakerRoom>();
  const bakeryId = localStorage.getItem("bakerRoom");
  const { data: bakery, refetch } = useBakeryQuery({
    id: bakeryId!,
  });

  useEffect(() => {
    refetch();
    if (bakery) {
      setBakerRoom(bakery.bakerRoom!);
    }
  }, [bakeryId, bakerRoom, bakery, refetch]);

  return (
    <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full">
      <div className="flex justify-center items-center gap-5 relative h-10">
        <h2 className="text-white text-[24px] font-[600]">
          {bakerRoom?.title && bakerRoom.title}
        </h2>
        <Link to="/notification" aria-label="Bildirishnoma">
          <FaBell
            size={25}
            className="text-[#FFCC15] cursor-pointer absolute bottom-1 right-6"
          />
        </Link>
      </div>
    </div>
  );
};
