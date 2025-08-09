import { ParkashNotification } from "@/page-ui";

const Notification = () => {
  return (
    <div className="pt-[15px]">
      {/* {localStorage.getItem("ROLE") === roles.PARKASH_TABLET ? (
        <>tabled</>
      ) : (
        <ParkashNotification />
      )} */}
      <ParkashNotification />
    </div>
  );
};

export default Notification;
