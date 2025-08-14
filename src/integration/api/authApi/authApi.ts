import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import {
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: PATHS.LOGIN,
        method: "POST",
        body,
      }),
    }),
    profile: build.query<ProfileResponse, object>({
      query: () => ({
        url: PATHS.ME,
        method: "GET",
      }),
      providesTags: [API_TAGS.USER],
    }),
    updateAvatar: build.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: ({ avatar }) => ({
        url: PATHS.EDIT,
        method: "PATCH",
        body: { avatar },
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    uploadImage: build.mutation<string, FormData>({
      query: (formData) => ({
        url: PATHS.UPLOAD,
        method: "POST",
        body: formData,
        responseHandler: "text",
      }),
    }),
    updatePassword: build.mutation<
      UpdatePasswordResponse,
      UpdatePasswordRequest
    >({
      query: (body) => ({
        url: PATHS.EDIT_PASSWORD,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
  }),
});

export const {
  useLoginMutation,
  useProfileQuery,
  useUpdateAvatarMutation,
  useUploadImageMutation,
  useUpdatePasswordMutation,
} = authApi;
