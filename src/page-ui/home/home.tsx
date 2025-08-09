import {
  useBakeryQuery,
  useGetUsersQuery,
  useProfileQuery,
} from "@/integration/api";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "@/components";
import { MoneyFormatter } from "@/utils/money-formatter";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MenuType {
  amount?: number;
  label?: string;
  href: string;
}

interface EmployeeData {
  id: string;
  name: string;
  amount: string;
}

export const ParkashHome = () => {
  const { data: profile } = useProfileQuery({});
  const currentBakery = localStorage.getItem("bakerRoom") || "{}";

  const { data: bakery } = useBakeryQuery({
    id: currentBakery!,
  });

  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAmount, setCurrentAmount] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  );
  const [, setLastResetDate] = useState<string>("");
  const [currentBakeryId, setCurrentBakeryId] = useState<string>("");
  const prevBakeryIdRef = useRef<string>("");

  const loadEmployeesForBakery = (bakeryId: string) => {
    const today = new Date().toISOString().split("T")[0];
    const savedLastResetDate = localStorage.getItem("lastResetDate") || "";
    const bakeryEmployeesKey = `employees_${bakeryId}`;

    if (savedLastResetDate !== today) {
      localStorage.setItem("lastResetDate", today);
      localStorage.setItem(bakeryEmployeesKey, JSON.stringify([]));
      setEmployees([]);
      setLastResetDate(today);
    } else {
      const savedEmployees = localStorage.getItem(bakeryEmployeesKey);
      if (savedEmployees) {
        setEmployees(JSON.parse(savedEmployees));
      } else {
        localStorage.setItem(bakeryEmployeesKey, JSON.stringify([]));
        setEmployees([]);
      }
      setLastResetDate(savedLastResetDate);
    }
  };

  useEffect(() => {
    const checkBakeryChange = () => {
      const currentBakery = localStorage.getItem("bakerRoom") || "{}";

      const bakeryId = currentBakery || "";

      if (bakeryId && bakeryId !== prevBakeryIdRef.current) {
        setCurrentBakeryId(bakeryId);
        prevBakeryIdRef.current = bakeryId;
        loadEmployeesForBakery(bakeryId);
      }
    };

    checkBakeryChange();

    const intervalId = setInterval(checkBakeryChange, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentBakeryId) {
      const bakeryEmployeesKey = `employees_${currentBakeryId}`;
      localStorage.setItem(bakeryEmployeesKey, JSON.stringify(employees));
    }
  }, [employees, currentBakeryId]);

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

  // const { data: getBranch } = useGetBranchQuery({
  //   id: profile?.branch || "",
  // });

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

  const handleEmployeeSelect = (value: string) => {
    const employee = getUsers?.find((user) => user._id === value);
    if (employee) {
      const existingEmployee = employees.find((emp) => emp.id === employee._id);

      if (!existingEmployee) {
        setEmployees((prev) => [
          ...prev,
          {
            id: employee._id,
            name: employee.fullName,
            amount: "0",
          },
        ]);
      }

      setSelectedEmployeeId(employee._id);
      setCurrentAmount(existingEmployee?.amount || "0");
      setIsModalOpen(true);
    }
  };

  const handleSubmit = () => {
    if (selectedEmployeeId) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedEmployeeId
            ? { ...emp, amount: currentAmount }
            : emp
        )
      );

      setIsModalOpen(false);
      setCurrentAmount("");
      setSelectedEmployeeId(null);
    }
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
      <div className="border-[1px] border-[#FFCC15] rounded-[8px] p-[13px] bg-white flex items-center justify-between mt-[15px]">
        <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
          0
        </p>
        <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
          {/* {MoneyFormatter(String(getBranch?.doughPrice)) || 0} */} 200 000
        </p>
        <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
          {/* {MoneyFormatter()
           String((doughs?.length || 0) * (getBranch?.doughPrice || 0))
          } */}{" "}
          200
        </p>
      </div>

      {employees.map((employee) => (
        <div
          key={employee.id}
          className="border-[1px] border-[#FFCC15] rounded-[8px] p-[13px] bg-white flex items-center justify-between mt-[15px] cursor-pointer"
          onClick={() => {
            setSelectedEmployeeId(employee.id);
            setCurrentAmount(employee.amount);
            setIsModalOpen(true);
          }}
        >
          <p className="text-[#1C2C57] text-[16px] font-semibold">
            {employee.name}
          </p>
          <p className="text-[#1C2C57] text-[14px] font-semibold rounded-[3px] bg-[#D9D9D9] px-[10px] shrink-0">
            {MoneyFormatter(employee.amount)}
          </p>
        </div>
      ))}

      <div className="pt-[35px]">
        <Select aria-label="Select User" onValueChange={handleEmployeeSelect}>
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
