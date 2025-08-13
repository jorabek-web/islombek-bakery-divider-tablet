import { GetNotificationRequest } from "./types.d";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import { GetNotificationResponse } from "./types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<
      GetNotificationResponse[],
      GetNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.NOTIFICATIONS_START + id + PATHS.NOTIFICATIONS_END,
        method: "GET",
      }),
      providesTags: ["Notification"],
      // async onCacheEntryAdded(
      //   _,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   try {
      //     await cacheDataLoaded;
      //     socket.on("notification", (newNotification) => {
      //       updateCachedData((draft) => {
      //         if (Array.isArray(draft)) {
      //           draft.unshift(newNotification);
      //         }
      //       });
      //     });
      //   } catch (error) {
      //     console.error("Socket error:", error);
      //   }
      //   await cacheEntryRemoved;
      //   socket.off("notification");
      // },
    }),
    getNotification: build.query<
      GetNotificationResponse,
      GetNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.NOTIFICATION + id,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery, useGetNotificationQuery } =
  notificationApi;
