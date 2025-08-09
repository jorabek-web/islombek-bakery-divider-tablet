import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./top-bar";
import { Menu } from "./menu";
import { useGetUSerMeQuery } from "@/integration";
import { useStorage } from "@/utils";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { roles } from "@/constants";
import { useEffect } from "react";

export const PageLayout = () => {
  const location = useLocation();
  const { data: user } = useGetUSerMeQuery({});
  const token = useStorage.getTokens().accessToken;

  useEffect(() => {
    if (user?.bakerRoom && user._id) {
      const { _id, bakerRoom } = user;
      localStorage.setItem("userId", _id);
      localStorage.setItem("bakerRoom", bakerRoom);
    }
  }, [token, user]);

  if (
    user &&
    token &&
    !user.bakerRoom &&
    "message" in user &&
    user.role === roles.PARKASH_TABLET
  ) {
    toast(user.message!);
    return (
      <div>
        <Toaster />

        <div className="mt-28 px-2 flex flex-col items-center">
          <h2 className="text-white text-[18px] text-center">
            Nomalum xatolik, bir ozdan song sahifani yangilang
          </h2>

          <Button
            variant={"yellow"}
            className="mt-5"
            onClick={() => (window.location.href = "/")}
          >
            yangilash
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {location.pathname === "/" && <TopBar />}
      <div className="py-[80px] px-[20px]">
        <Outlet />
      </div>
      {(location.pathname === "/" || location.pathname === "/profile") && (
        <Menu />
      )}
    </div>
  );
};
