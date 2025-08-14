import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStorage } from "@/utils";
import { BiUpload } from "react-icons/bi";

export const LeaveTheAccount = () => {
  const handleLogout = () => {
    useStorage.removeCredentials();
    window.location.href = "/login";
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          asChild
          className="w-full"
          aria-label="Open logout dialog"
        >
          <div
            className="rounded-[8px] p-[10px] bg-white flex items-center gap-[7px]"
            role="button"
            tabIndex={0} // Makes the div focusable
          >
            <BiUpload size={25} />
            <p className="text-[14px] font-[900]">Akkountdan chiqish</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          className="bg-[#1C2C57] border-none rounded-[20px] text-white w-11/12"
        >
          <AlertDialogHeader>
            <AlertDialogTitle id="dialog-title">
              Akkountdan chiqish
            </AlertDialogTitle>
            <AlertDialogDescription id="dialog-description" className="text-[#fff9]">
              Siz haqiqatan ham akkountdan chiqmoqchi misiz? davom etish
              tugmasini bosing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              aria-label="Cancel"
              className="bg-[#FFCC15] text-[#1C2C57] border-none"
            >
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              aria-label="Proceed"
              onClick={handleLogout}
              className="bg-[#C71A1A] text-white border-none"
            >
              Davom etish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
