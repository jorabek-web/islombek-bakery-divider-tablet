import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FC } from "react"
import { Loader } from "./loader"

interface SelectProps {
    userData: GetAllUsersResponse[] | undefined
    className?: string
    title?: string
    setId: (id: string) => void,
    isLoading?: boolean
}

export const SelectUser: FC<SelectProps> = ({ userData, className, setId, title="Chat qo'shish", isLoading }) => {

    return (
        <Select aria-label="Select User"
            onValueChange={(value) => {
                setId(value);
            }}
        >
            <SelectTrigger aria-haspopup="listbox" aria-expanded="false" aria-labelledby="select-label" className={cn("w-full", className)}>
                <SelectValue id="select-label" placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup role="group">
                    {isLoading && <Loader className="mx-auto size-[50px]"/>}
                    {userData?.map((item) => (
                        <SelectItem
                            key={item._id}
                            value={item._id}
                            onClick={() => setId(item?._id)}
                            className="text-[#1C2C57] text-[16px] font-semibold"
                            role="option"
                        >
                            {item?.fullName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}