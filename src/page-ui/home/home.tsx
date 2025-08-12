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
  const currentBakery = localStorage.getItem("bakerRoom") || "{}";
  const { data: bakerySalary } = useBakerySalaryQuery({ id: currentBakery });
  const [addDivider] = useAddDividerMutation();
  const [addDividerSalary] = useAddDividerSalaryMutation();

  const { data: bakery } = useBakeryQuery({
    id: currentBakery!,
  });

  // const [employees, setEmployees] = useState<EmployeeData[]>([]);
  // const [, setLastResetDate] = useState<string>("");
  // const [currentBakeryId, setCurrentBakeryId] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string | number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDividerId, setSelectedDividerId] = useState<string>();
  // const prevBakeryIdRef = useRef<string>("");

  // const loadEmployeesForBakery = (bakeryId: string) => {
  //   const today = new Date().toISOString().split("T")[0];
  //   const savedLastResetDate = localStorage.getItem("lastResetDate") || "";
  //   const bakeryEmployeesKey = `employees_${bakeryId}`;

  //   if (savedLastResetDate !== today) {
  //     localStorage.setItem("lastResetDate", today);
  //     localStorage.setItem(bakeryEmployeesKey, JSON.stringify([]));
  //     setEmployees([]);
  //     setLastResetDate(today);
  //   } else {
  //     const savedEmployees = localStorage.getItem(bakeryEmployeesKey);
  //     if (savedEmployees) {
  //       setEmployees(JSON.parse(savedEmployees));
  //     } else {
  //       localStorage.setItem(bakeryEmployeesKey, JSON.stringify([]));
  //       setEmployees([]);
  //     }
  //     setLastResetDate(savedLastResetDate);
  //   }
  // };

  // useEffect(() => {
  //   const checkBakeryChange = () => {
  //     const currentBakery = localStorage.getItem("bakerRoom") || "{}";

  //     const bakeryId = currentBakery || "";

  //     if (bakeryId && bakeryId !== prevBakeryIdRef.current) {
  //       setCurrentBakeryId(bakeryId);
  //       prevBakeryIdRef.current = bakeryId;
  //       loadEmployeesForBakery(bakeryId);
  //     }
  //   };

  //   checkBakeryChange();

  //   const intervalId = setInterval(checkBakeryChange, 500);

  //   return () => clearInterval(intervalId);
  // }, []);

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
    console.log(value);

    const res = await addDivider({
      id: currentBakery,
      user: value,
    });

    console.log(res);
  };

  const handleSubmit = async () => {
    if (!selectedDividerId || !currentAmount || !currentBakery) return;

    const res = await addDividerSalary({
      id: currentBakery,
      user: selectedDividerId,
      salary: Number(currentAmount),
    });

    console.log(res);
    setSelectedDividerId("");
    setCurrentAmount("");
    setIsModalOpen(false);
  };

  return (
    <div className="pt-[35px]">
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
                <TableRow className="h-6 flex items-center justify-between">
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-4 w-2/3">
                    Zuvala turi
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-4 w-1/2">
                    Soni
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-4 w-1/2">
                    Narxi
                  </TableCell>
                  <TableCell className="font-bold text-[14px] text-[#FFCC15] p-1 px-4 w-1/2">
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
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                          Patir
                        </TableCell>
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                          {MoneyFormatter(580)}
                        </TableCell>
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                          {MoneyFormatter(576)}
                        </TableCell>
                        <TableCell className="font-bold text-[14px] text-[#1C2C57] p-2 px-4 w-1/2">
                          {MoneyFormatter(334080)}
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
        <Select aria-label="Select User" onValueChange={handleDividerSelect}>
          <SelectTrigger
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-labelledby="select-label"
            className="w-full bg-white border-[1px] border-[#FFCC15] rounded-[8px] text-[#1C2C57] text-[16px] font-semibold"
          >
            <SelectValue id="select-label" placeholder={"Xodim qoshish"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup role="group">
              {getUsersLoading && <Loader className="mx-auto size-[50px]" />}
              {getUsers
                ?.filter((item) => item?._id !== profile?._id)
                .map((item) => (
                  <SelectItem
                    key={item._id}
                    value={item._id}
                    className="text-[#1C2C57] text-[16px] font-semibold"
                    role="option"
                  >
                    {item?.fullName}
                  </SelectItem>
                ))}
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
                  type="number"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  className="w-full border border-[#FFCC15] rounded-[8px] p-2 text-[#1C2C57]"
                  placeholder="Summani kiriting"
                />
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
