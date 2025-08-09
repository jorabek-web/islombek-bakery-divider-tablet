import { useState } from "react";
import { Title } from "./Title";
import { MoneyFormatter } from "@/utils/money-formatter";
import { FaMinus, FaPlus, FaRegEdit } from "react-icons/fa";
import { LOAVESES_NUMBER_LIST } from "@/constants";

export const LoavesesNumber = ({
  type = "default",
}: {
  type?: "default" | "mini" | "table";
}) => {
  const totalAmount = (
    amount: { name: string; price: number; theNumber: number }[] | undefined
  ): string => {
    return `Umumiy summa: ${
      amount?.reduce((acc, cur) => acc + cur.price * cur.theNumber, 0) || 0
    }`;
  };

  const [priceEditInput, setPriceEditInput] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div>
      <div
        className={`${
          type === "table" &&
          "w-full mt-4 bg-white border border-[#FFCC15] rounded-[8px] flex flex-col px-2"
        }`}
      >
        {LOAVESES_NUMBER_LIST.map((item, idx) =>
          type === "table" ? (
            <div className="flex items-center justify-between gap-x-2 font-semibold text-[#1C2C57]">
              <span className="font-bold flex-1 text-left">{item.name}</span>
              <span className="flex-1 text-center text-[18px]">
                {MoneyFormatter(item.price)}
              </span>
              <span className="flex-1 text-right text-[18px]">
                {item.theNumber}
              </span>
            </div>
          ) : (
            <div key={item.name} className="w-full">
              <div className="flex flex-col gap-y-3 mt-4">
                <div
                  key={item.name}
                  className="w-full border border-[#FFCC15] font-bold rounded-[8px] p-2 flex items-center justify-between bg-white"
                >
                  <span className="text-[#1C2C57] flex-1 text-left">
                    {item.name}
                  </span>
                  <span className="text-[#1C2C57] font-semibold flex items-center justify-center gap-1 flex-1 text-center">
                    {priceEditInput[idx] ? (
                      <input
                        type="text"
                        autoFocus
                        value={item.price}
                        onChange={() => {}}
                        className="outline-none w-1/3 bg-black/10"
                      />
                    ) : (
                      item.price
                    )}
                    {type !== "mini" && (
                      <FaRegEdit
                        size={20}
                        className="cursor-pointer"
                        onClick={() =>
                          setPriceEditInput((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                      />
                    )}
                  </span>
                  <div className="w-1/3 flex items-center gap-1 justify-between">
                    <button
                      type="button"
                      className="bg-[#1C2C57] p-1 rounded-[8px]"
                    >
                      <FaMinus
                        size={type === "mini" ? 16 : 20}
                        className="cursor-pointer text-[#FFCC15]"
                      />
                    </button>
                    <span className="text-[14px] text-[#1C2C57]">
                      {item.theNumber}
                    </span>
                    <button
                      type="button"
                      className="bg-[#1C2C57] p-1 rounded-[8px]"
                    >
                      <FaPlus
                        size={type === "mini" ? 16 : 20}
                        className="cursor-pointer text-[#FFCC15]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Title
        text={MoneyFormatter(totalAmount(LOAVESES_NUMBER_LIST))}
        className={`text-white mt-2 text-left ${
          type === "mini" && "text-[19px]"
        }`}
      />
    </div>
  );
};
