import { ProfileResponse } from "../authApi/types";

interface UserProfile {
  user: ProfileResponse;
}

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

interface DoughType {
  _id: string;
  title: string;
  price_for_baker: string;
  price_for_divider: string;
  bread_selling_price: number;
}

interface DoughBallInfo {
  dough_ball_count: number;
  divided_by_workers: string[];
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

interface UserInfo {
  _id: string;
  role: string;
  status: number;
  branch: string;
  fullName: string;
  username: string;
}

interface Baker {
  _id: string;
  salary: number;
  user: UserInfo;
}

interface BakerInfo {
  totalCount: number;
  totalMoney: number;
  bakers: Baker[];
  doughs: [];
  remainingMoney: number;
}

interface Divider {
  id: string;
  salary: number;
  user: UserInfo;
}
interface Dough {
  _id: string;
  doughType: DoughType;
  count: number;
  totalMoney: number;
  type: string;
}

interface DividerInfo {
  totalCount: number;
  totalMoney: number;
  dividers: Divider[];
  doughs: Dough[];
  transferredCount: number;
  remainingMoney: number;
}

interface SalaryRequest {
  id: string;
}

interface SalaryResponse {
  _id: string;
  bakerRoomId: string;
  date: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
  bakerInfo: BakerInfo;
  dividerInfo: DividerInfo;
}

interface AddDividerRequest {
  id: string;
  user: string;
}

interface AddDividerBaker {
  _id: string;
  salary: number;
  user: string;
}

interface AddDivider {
  _id: string;
  salary: number;
  user: string;
}

interface AddDividerBakerInfo {
  totalCount: number;
  totalMoney: number;
  bakers: AddDividerBaker[];
  doughs: [];
  remainingMoney: number;
}

interface AddDividerInfo {
  totalCount: number;
  totalMoney: number;
  dividers: AddDivider[];
  doughs: [];
  transferredCount: number;
  remainingMoney: number;
}

interface Doc {
  _id: string;
  bakerRoomId: string;
  date: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
  bakerInfo: AddDividerBakerInfo;
  dividerInfo: AddDividerInfo;
}

interface AddDividerResponse {
  doc: Doc;
  message: string;
}

interface AddDividerSalaryRequest {
  id: string;
  user: string;
  salary: number;
}

interface AddDividerSalaryResponse {
  message?: string;
}

interface BakeryDoughResponse {
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
  transferred_driver: string;
  isBakerRoomTransferredToBakerRoom: boolean;
  createdAt: string;
  updatedAt: string;
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

interface BakeryDivideRequest {
  id: string;
  bakerRoomId: string;
  dough_ball_count: number;
  divided_by_workers: string[];
}

interface BakeryDivideResponse {
  data: {
    message: string;
  };
}

interface BakeryDivideUpdateRequest {
  id: string;
  bakerRoomId: string;
  dough_ball_count: number;
  divided_by_workers?: string[];
}

interface BakeryDivideUpdateResponse {
  data: {
    message: string;
  };
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
