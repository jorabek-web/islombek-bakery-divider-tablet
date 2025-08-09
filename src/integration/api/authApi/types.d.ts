interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export interface ProfileResponse {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  avatar: string;
  debt: number;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileResponse {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileRequest {
  avatar: string;
}

interface UploadImageRequest {
  formData: FormData;
}

interface UpdatePasswordResponse {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  branch: string;
  balance: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
