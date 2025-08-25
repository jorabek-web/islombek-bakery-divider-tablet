import { Title } from "@/components";
import { useGetNotificationsQuery } from "@/integration";
import { FaRegClock } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { Link } from "react-router-dom";

export const ParkashNotification = () => {
  const userId = localStorage.getItem("userId") || "";
  const {
    data: notifications,
    // refetch,
  } = useGetNotificationsQuery({
    id: userId,
  });

  // useEffect(() => {
  //   const handleNotification = () => refetch();
  //   socket.on("notification", handleNotification);
  //   return () => {
  //     socket.off("notification", handleNotification);
  //   };
  // }, []);

  return (
    <>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] -ml-[20px] fixed top-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Bildirishnoma"} className="text-white mx-auto" />
        </div>
      </div>

      <div className="pt-[35px] text-white space-y-3">
        {notifications ? (
          notifications?.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item._id}
                className="rounded-[12px] border-2 border-[#FFCC15] p-3 space-y-2"
              >
                <p className="text-[20px] font-[600]">{item.title}</p>
                <div className="flex items-start justify-between gap-5">
                  <p className="text-[20px] font-[600]">{item.body}</p>
                  <div className="flex flex-col gap-2 justify-between pt-[10px]">
                    <div className="flex items-center gap-x-2">
                      <LuCalendarDays size={20} />
                      <p className="text-[10px] font-[400]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <FaRegClock size={20} />
                      <p className="text-[10px] font-[400]">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">
              hozircha bildirishnomalar mavjud emas
            </p>
          )
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </>
  );
};
