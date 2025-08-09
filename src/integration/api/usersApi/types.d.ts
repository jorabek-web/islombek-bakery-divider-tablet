interface GetAllUsersResponse {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface GetUserRequest {
  id?: string;
}
interface Sessions {
  _id: string;
  userAgent: string;
  ip: string;
  approved: boolean;
  createdAt: string;
}

interface GetUserMeResponse {
  _id: string;
  role: string;
  status: number;
  branch: string;
  fullName: string;
  avatar: string;
  username: string;
  sessions: Sessions[];
  createdAt: string;
  updatedAt: string;
  bakerRoom: string;
  balance: string;
  balance: number;
  breadPrices: [];
  salaryBalance: string;

  message?: string;
  user?: string;
  role: string;
}
