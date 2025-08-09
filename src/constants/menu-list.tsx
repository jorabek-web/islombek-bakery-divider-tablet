import { CiUser } from "react-icons/ci";
import { RiHome5Fill } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";

export const PARKASH_MENU_LIST = [
  {
    icon: <RiHome5Fill size={25} />,
    label: "Asosiy",
    link: "/",
  },

  {
    icon: <TiMessages size={25} />,
    label: "Xabarlar",
    link: "/message",
  },

  {
    icon: <CiUser size={25} />,
    label: "Profil",
    link: "/profile",
  },
];

export const PARKASH_TABLET_MENU_LIST = [
  {
    icon: <RiHome5Fill size={25} />,
    label: "Asosiy",
    link: "/",
  },
  {
    icon: <CiUser size={25} />,
    label: "Profil",
    link: "/profile",
  },
];

export const CLOSER_ORDER_FORM_LIST = [
  {
    type: "text",
    name: "customer",
    labelText: "Mijoz",
    placeholder: "Mijoz ismi",
    value: "Afruz to’yxona",
  },
  {
    type: "phone",
    name: "phone",
    labelText: "Telefon",
    placeholder: "+998 99 999 99 99",
    value: "+998 99 123 45 67",
  },
  {
    type: "text",
    name: "address",
    labelText: "Manzil",
    placeholder: "Mijoz manzili",
    value: "Shohbekat",
  },
  {
    type: "text",
    name: "explanation",
    labelText: "Izoh",
    placeholder: "Buyurtma haqida izoh",
    value: "Qolgan pulini bo’lib to’lar ekan",
  },
  {
    type: "dateAndTime",
    name: "deliveryTime",
    labelText: "Topshrish vaqti",
    placeholder: "Topshirish vaqti",
    value: "16.04.2025 10:30",
  },
  {
    type: "number",
    name: "receivedMoney",
    labelText: "Olingan pul",
    placeholder: "Pul miqdori",
    value: "100000",
  },
];

export const LOAVESES_NUMBER_LIST = [
  {
    name: "Chig'atoy",
    price: 5000,
    theNumber: 100,
  },
  {
    name: "Patir",
    price: 4000,
    theNumber: 200,
  },
  {
    name: "Buxonka",
    price: 3000,
    theNumber: 150,
  },
];
