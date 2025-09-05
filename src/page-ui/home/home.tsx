import {
  useBakeryQuery,
  useBakerySalaryQuery,
  useGetUsersQuery,
  useProfileQuery,
  useAddDividerMutation,
  useAddDividerSalaryMutation,
} from "@/integration/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoneyFormatter } from "@/utils/money-formatter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "@/components";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import { AddDividerSalaryError } from "@/integration/api/bakeryApi/types";

interface MenuType {
  amount?: number;
  label?: string;
  href: string;
}

// interface EmployeeData {
//   id: string;
//   name: string;
//   amount: string;
// }

export const ParkashHome = () => {
  const { data: profile } = useProfileQuery({});
  const currentBakery = localStorage.getItem("bakerRoom") || "";
  const { data: bakerySalary, refetch: brsalaryRefetch } = useBakerySalaryQuery(
    { id: currentBakery }
  );
  const [addDivider] = useAddDividerMutation();
  const [addDividerSalary] = useAddDividerSalaryMutation();
  const { data: bakery, refetch: brRefetch } = useBakeryQuery({
    id: currentBakery!,
  });

  useEffect(() => {
    if (currentBakery) {
      brsalaryRefetch();
      brRefetch();
    }
  }, [currentBakery]);

  const [currentAmount, setCurrentAmount] = useState<string | number>();
  const [currentMeAmount, setCurrentMeAmount] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDividerId, setSelectedDividerId] = useState<string>();
  const [salaryDividerId, setSalaryDividerId] = useState<string[]>();
  const [dividerSelect, setDividerSelect] = useState<string>("");
  const [getFilteredUsers, setFilteredUsers] = useState<GetAllUsersResponse[]>(
    []
  );

  const [menu, setMenu] = useState<MenuType[]>([
    {
      amount: 0,
      label: "Xamir",
      href: "/xamir",
    },
    {
      label: "Zuvala",
      href: "/zuvala",
    },
  ]);

  const { data: getUsers, isLoading: getUsersLoading } = useGetUsersQuery([
    "DIVIDER",
  ]);

  useEffect(() => {
    const isDividerId = [] as string[];
    bakerySalary?.dividerInfo.dividers?.forEach((user) => {
      isDividerId.push(user.user._id);
    });
    setSalaryDividerId(isDividerId);
  }, [getUsers, getUsersLoading, bakerySalary]);

  useEffect(() => {
    setFilteredUsers(
      getUsers
        ?.filter((item) => item?._id !== profile?._id)
        .filter((divider) => !salaryDividerId?.includes(divider._id)) || []
    );
  }, [getUsers, getUsersLoading, profile, salaryDividerId]);

  useEffect(() => {
    if (currentBakery && bakery?.bakerRoom) {
      setMenu((prev) =>
        prev.map((item) =>
          item.label === "Xamir"
            ? {
                ...item,
                amount: bakery?.bakerRoom.doughsCount,
                loading: false,
              }
            : item
        )
      );
    }
  }, [currentBakery, bakery]);

  const handleDividerSelect = async (value: string) => {
    if (!value || !currentBakery) return;
    setDividerSelect(value);
    console.log(value);

    const res = await addDivider({
      id: currentBakery,
      user: value,
    });

    if ("data" in res) {
      toast.success(res.data!.message);
    }

    setDividerSelect("");
  };

  const handleSubmit = async () => {
    if (
      !selectedDividerId ||
      !Number(currentAmount) ||
      Number(currentAmount) <= 0 ||
      !currentBakery
    )
      return;

    try {
      const res = await addDividerSalary({
        id: currentBakery,
        user: selectedDividerId,
        salary: Number(currentAmount),
      }).unwrap();

      if ("message" in res) {
        toast.success(res.message);
      }

      setSelectedDividerId("");
      setCurrentAmount("");
      setIsModalOpen(false);
    } catch (error: unknown) {
      const err = error as AddDividerSalaryError;
      toast.error(err.data.message ?? "Noma’lum xato yuz berdi");
    }
  };

  return (
    <div className="pt-[35px]">
      <Toaster position="top-center" />

      <div className="grid grid-cols-2 w-full gap-[10px] pt-[30px]">
        {menu?.map((item, i) => (
          <Link
            to={item.href}
            key={i}
            className="rounded-[16px] flex flex-col items-center justify-center cursor-pointer border-[3px] text-center bg-white text-[#1C2C57] py-[20px] border-[#FFCC15]"
          >
            <p className="text-[32px] font-[600]">{item.amount}</p>
            <p className="text-[20px] font-[800]">{item.label}</p>
          </Link>
        ))}
      </div>

      <Accordion type="multiple" className="my-5">
        <AccordionItem value="item">
          <AccordionTrigger className="w-full h-12 p-2 rounded-lg bg-white border border-[#FFCC15]">
            <div className="w-full h-full flex items-center justify-between">
              <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
                {MoneyFormatter(bakerySalary?.dividerInfo.totalCount || 0)}
              </p>
              <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
                {MoneyFormatter(bakerySalary?.dividerInfo.totalMoney || 0)}
              </p>
              <div></div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                <TableRow className="h-7 flex items-center justify-between">
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-3 w-2/3 min-w-max">
                    Zuvala turi
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-3 w-1/2">
                    Soni
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-3 w-1/2">
                    Narxi
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-3 w-1/2">
                    Umumiy
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="bg-white rounded-xl border-2 border-[#FFCC15]">
              <Table>
                <TableBody>
                  {bakerySalary?.dividerInfo.doughs &&
                  bakerySalary?.dividerInfo.doughs.length ? (
                    bakerySalary.dividerInfo.doughs.map((item) => (
                      <TableRow
                        key={item._id}
                        className="h-10 hover:bg-transparent border-b border-b-[#FFCC15] flex items-center justify-between"
                      >
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2 min-w-max">
                          {item.doughType.title}
                        </TableCell>
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2 min-w-max">
                          {MoneyFormatter(item.count)}
                        </TableCell>
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2 min-w-max">
                          {MoneyFormatter(item.doughType.price_for_divider)}
                        </TableCell>
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2 min-w-max">
                          {MoneyFormatter(item.totalMoney)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-8 hover:bg-transparent border-b border-b-[#FFCC15] flex items-center justify-between">
                      <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                        mavjud emas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {bakerySalary?.dividerInfo.dividers &&
        bakerySalary?.dividerInfo.dividers.map((divider) => (
          <div
            key={divider.user._id}
            className="border-[1px] border-[#FFCC15] rounded-[8px] p-[13px] bg-white flex items-center justify-between mt-[15px] cursor-pointer"
            onClick={() => {
              setSelectedDividerId(divider.user._id);
              setCurrentAmount(divider.salary);
              setCurrentMeAmount(divider.salary);
              setIsModalOpen(true);
            }}
          >
            <p className="text-[#1C2C57] text-[16px] font-semibold">
              {divider?.user.fullName}
            </p>
            <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
              {MoneyFormatter(divider?.salary)}
            </p>
          </div>
        ))}

      <div className="pt-[35px]">
        <Select
          aria-label="Select User"
          value={dividerSelect}
          onValueChange={handleDividerSelect}
        >
          <SelectTrigger
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-labelledby="select-label"
            className="w-full bg-white border-[1px] border-[#FFCC15] rounded-[8px] text-[#1C2C57] text-[16px] font-semibold"
          >
            <SelectValue id="select-label" placeholder={"Xodim qoshish"} />
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#FFCC15] rounded-[8px] p-0">
            <SelectGroup role="group" className="bg-transparent p-0">
              {getUsersLoading && <Loader className="mx-auto size-[50px]" />}
              {getFilteredUsers.length > 0 ? (
                getFilteredUsers.map((item, idx) => (
                  <SelectItem
                    key={item._id}
                    value={item._id}
                    className={`text-[#1C2C57] text-[16px] font-semibold rounded-none h-8 border-0 ${
                      ++idx !== getFilteredUsers.length &&
                      "border-b border-[#FFCC15]"
                    } px-4 m-0 outline-none`}
                    role="option"
                  >
                    {item?.fullName}
                  </SelectItem>
                ))
              ) : (
                <SelectItem
                  value="default"
                  disabled
                  className="text-[#1C2C57] text-[16px] font-semibold border-0 h-8 px-4 m-0"
                  role="option"
                >
                  Xodimlar mavjud emas
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetContent
          side="bottom"
          className="bg-[#1C2C57] border-none rounded-t-[20px]"
        >
          <SheetHeader className="border-2 border-[#FFCC15] rounded-[12px] p-[15px]">
            <div className="space-y-4">
              <div>
                <label className="text-[#FFCC15] text-[16px] font-semibold block mb-2">
                  Summa kiriting
                </label>
                <input
                  type="string"
                  value={currentAmount && MoneyFormatter(currentAmount)}
                  onChange={(e) =>
                    setCurrentAmount(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full border border-[#FFCC15] rounded-[8px] p-2 text-[#1C2C57] ${
                    currentAmount &&
                    bakerySalary &&
                    Number(currentAmount) >
                      bakerySalary!.dividerInfo.remainingMoney! +
                        Number(currentMeAmount) &&
                    "border-red-600"
                  }`}
                  placeholder="Summani kiriting"
                />
                {currentAmount &&
                  bakerySalary &&
                  Number(currentAmount) >
                    bakerySalary!.dividerInfo.remainingMoney! +
                      Number(currentMeAmount) && (
                    <p className="text-red-600 text-sm mt-1">
                      kiritilgan summa bo'luvchilar uchun ajratilgan summadan
                      katta
                    </p>
                  )}
                {Number(currentAmount) <= 0 && (
                  <p className="text-red-600 text-sm mt-1">
                    summani to'g'ri kiriting
                  </p>
                )}
              </div>
              <Button
                variant="yellow"
                className="w-full text-[16px] font-semibold"
                onClick={handleSubmit}
              >
                Saqlash
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
