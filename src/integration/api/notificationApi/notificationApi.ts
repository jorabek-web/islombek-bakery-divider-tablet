import { socket } from "@/utils";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import { GetNotification } from "./types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<GetNotification[], object>({
      query: () => ({
        url: PATHS.NOTIFICATIONS,
        method: "GET",
      }),
      providesTags: ["Notification"],
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("notification", (newNotification) => {
            updateCachedData((draft) => {
              if (Array.isArray(draft)) {
                draft.unshift(newNotification);
              }
            });
          });
        } catch (error) {
          console.error("Socket error:", error);
        }
        await cacheEntryRemoved;
        socket.off("notification");
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
