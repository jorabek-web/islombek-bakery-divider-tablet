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
        {/* {[
          {
            type: "DELIVERED",
            _id: 1234534545,
            from: { fullName: "Jo'rabk" },
            createdAt: 123456,
            delivery: { breads: 203 },
          },
        ] */}
        {notifications ? (
          notifications?.length ? (
            notifications
              ?.filter((item) => item.type === "DELIVERED" && item.delivery)
              .map((item) => (
                <div
                  key={item._id}
                  className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px] flex items-center justify-between"
                >
                  <p className="text-[20px] font-[600]">Xamir keldi</p>
                  <div className="flex flex-col gap-2 pt-[10px]">
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
                  {/* {item?.status === "PENDING" && (
                            // <div className="flex items-center justify-between pt-[25px]">
                            //     <Button variant='destructive' onClick={() => updateNotification({ id: item._id, status: "REJECTED" })}>Bekor qilish</Button>
                            //     <Button variant='greenary' onClick={() => updateNotification({ id: item._id, status: "ACCEPTED" })}>Tasdiqlash</Button>
                            // </div>
                        )} */}
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
