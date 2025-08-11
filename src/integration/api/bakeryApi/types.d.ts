import { ProfileResponse } from "../authApi/types";

interface BakerRoom {
  _id: string;
  title: string;
  images: string;
  branch: string;
  status: number;
  balance: number;
  doughsCount: number;
  roundsCount: number;
  inOvenCount: number;
  breadsCount: number;
  deliveredCount: number;
  soldCount: number;
  baker: string;
  divider: string;
  createdAt: string;
  updatedAt: string;
}

interface BakeryRequest {
  id: string;
}

interface BakeryResponse {
  bakerRoom: BakerRoom;
}

// {
//     "bakerRoom": {
//         "_id": "90ed9886-1b41-485a-85a3-c2cea0d8c7ce",
//         "title": "Jo'rabayeva",
//         "images": "https://images.unsplash.com/photo-1595798896730-9fdf2e709649?fm=jpg&w=640&q=80",
//         "branch": "31fd5fa9-6d29-4fc1-a1b8-e5fa0bde3d13",
//         "status": 1,
//         "balance": 1010000,
//         "doughsCount": 8,
//         "roundsCount": 7,
//         "inOvenCount": 0,
//         "breadsCount": 31,
//         "deliveredCount": 300,
//         "soldCount": 1000,
//         "baker": "21dbc4c5-6c3b-417e-8407-cb1da6b6eaf7",
//         "divider": "58c5cec8-0d5c-4eae-b6c1-26333770b9ce",
//         "createdAt": "2025-07-04T14:36:08.728Z",
//         "updatedAt": "2025-08-06T13:56:40.387Z",
//         "breadsWithType": {
//             "651b23db-f2ec-459e-a6fb-daea386252ac": 14,
//             "02c88306-7f9c-469d-9838-2e6e7bb96f20": 17
//         },
//         "breadsToday": {
//             "651b23db-f2ec-459e-a6fb-daea386252ac": 3,
//             "02c88306-7f9c-469d-9838-2e6e7bb96f20": 0
//         },
//         "breadsYesterday": {
//             "651b23db-f2ec-459e-a6fb-daea386252ac": 9,
//             "02c88306-7f9c-469d-9838-2e6e7bb96f20": 17
//         }
//     }
// }

interface DoughType {
  _id: string;
  title: string;
  price_for_baker: string;
  price_for_divider: string;
  bread_selling_price: string;
}

interface DoughBallInfo {
  dough_ball_count: number;
  divided_by_workers: Array;
}

interface DivideRequest {
  id: string;
}

interface DivideResponse {
  doughBallInfo: DoughBallInfo;
  _id: string;
  branch: string;
  dough_type: DoughType;
  doughroomId: string;
  status: number;
  send_to_baker_room: string;
  type: string;
  isReady: boolean;
  current_location: string;
  transferred_driver: string | null;
  isBakerRoomTransferredToBakerRoom: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BakeryDoughResponse {
  _id: string;
  doughroom: DoughroomResponse;
  status: DoughStatus;
  driver?: ProfileResponse;
  bakery?: BakeryResponse;
  dividers?: ProfileResponse[];
  rounds?: number;
  baker?: ProfileResponse;
  baked?: number;
  left?: number;
  createdAt: string;
  updatedAt: string;
  dough_type: { title: string };
}

interface BakeryDoughsRequest {
  id: string;
}

interface Breads {
  _id: string;
  driver: string;
  bakery: string;
  breads: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  toBakery: {
    title: string;
  };
}

interface BakeryBreadsResponse {
  doughs: BakeryDoughResponse[];
  breads: Breads[];
}

interface BakeryBreadsRequest {
  bakeryId: string;
  breadStatus?: string[];
  doughStatus?: string[];
}

interface BakeryDivideResponse {
  data: {
    message: string;
  };
}

interface BakeryDivideRequest {
  id: string;
  bakerRoomId: string;
  dough_ball_count: string;
  divided_by_workers: [];
}

interface BakeryBakeResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface BakeryBakeRequest {
  dough: string;
  baked: number;
  baker?: string;
}

interface BakeryRedirectResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
  redirect: string;
}

interface BakeryRedirectRequest {
  id: string;
  bakerRoomId: string;
  transferred_driver: string;
}
