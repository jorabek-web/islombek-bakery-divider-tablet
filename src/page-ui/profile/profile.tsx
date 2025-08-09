import { FaCamera } from "react-icons/fa";
import { ChangePassword, LeaveTheAccount } from "./_components";

import {
  useProfileQuery,
  useUpdateAvatarMutation,
  useUploadImageMutation,
} from "@/integration/api/authApi";
import { useEffect, useState } from "react";
export const Profile = () => {
  const { data: profile } = useProfileQuery({});
  const [updateAvatar] = useUpdateAvatarMutation();
  const [uploadImage] = useUploadImageMutation();
  // const [user, setUser] = useState<ProfileResponse>();
  const [avatarImg, setavatarImg] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  // const navigate = useNavigate();

  // const { data: getExpenses, isLoading } = useGetExpensesQuery({});

  //   useEffect(() => {
  //     // if (isError) {
  //     //     useStorage.removeCredentials()
  //     //     navigate("/login");
  //     // }

  //     if (profile) {
  //       setUser(profile);
  //     }
  //   }, [profile, isError, navigate]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResult = await uploadImage(formData).unwrap();

      await updateAvatar({
        avatar: JSON.parse(uploadResult).url,
      });
    } catch (error) {
      console.error("Failed to upload avatar", error);
    }
  };

  //   const balance = getExpenses?.reduce((acc, cur) => {
  //     if (cur?.receiver?._id === profile?._id && !cur?.reason) {
  //       return acc + cur?.amount;
  //     }

  //     return acc;
  //   }, 0);

  useEffect(() => {
    if (profile?.avatar) {
      setavatarImg(profile.avatar);
    }
  }, [profile]);

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] py-[30px] fixed top-0 w-full -mt-[30px] -ml-[20px]">
        <div className="flex items-center text-[#FFCC15] justify-start gap-x-[20px] pt-[35px]">
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="absolute size-[100px] z-10 opacity-0"
            />
            <img
              src={avatarImg}
              alt="avatar"
              loading="lazy"
              className="rounded-full size-[90px]"
            />
            <div className="bg-slate-300/50 rounded-full p-2 max-w-max absolute bottom-0 right-0">
              <FaCamera size={20} className="text-white" />
            </div>
          </div>
          <p className="text-[24px] font-semibold text-white">
            {profile?.fullName}
          </p>
        </div>
      </div>

      <div className="text-[#FFCC15] text-[20px] font-[700] pt-[130px]">
        {/* Balans: {MoneyFormatter(String(balance))} */}
      </div>

      <div className="grid grid-cols-1 w-full gap-y-[20px] pt-[62px] text-[#1C2C57]">
        <ChangePassword />

        <LeaveTheAccount />
      </div>
    </div>
  );
};
