import { API_TAGS, SERVER_URL } from "@/constants";
import { useStorage } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const CACHE_KEY = "rtk_cache";
// let isToastShown = false;

// const loadCache = () => {
//   try {
//     const data = localStorage.getItem(CACHE_KEY);
//     return data ? JSON.parse(data) : {};
//   } catch (error) {
//     console.error("Cache`ni yuklashda xatolik!", error);
//     return {};
//   }
// };

// const updateCache = (url: string, data: any) => {
//   try {
//     const cache = loadCache();
//     cache[url] = data;
//     localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
//   } catch (error) {
//     console.error("Cache`ni yangilashda xatolik!", error);
//   }
// };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    // const url = typeof args === "string" ? args : args.url;

    // if (!navigator.onLine) {
    //   await saveRequestOffline(args);
    //   const cache = loadCache();

    //   if (args.method !== "GET" && !isToastShown) {
    //     isToastShown = true;
    //     // toast.error("So‘rovingiz saqlandi, internetga ulanganingizda yuboriladi.");

    //     setTimeout(() => {
    //       isToastShown = false;
    //     }, 3000);
    //   }

    //   if (cache[url]) {
    //     return { data: cache[url] };
    //   } else {
    //     return {
    //       error: {
    //         status: "offline",
    //         message: "Internetga ulanmagan, siz offline'siz!",
    //       },
    //     };
    //   }
    // }

    const baseQuery = fetchBaseQuery({
      baseUrl: SERVER_URL,
      prepareHeaders: (headers) => {
        headers.set("Accept", "application/json");
        const token = useStorage.getTokens()?.accessToken;
        if (token) {
          headers.set("Authorization", token);
        }
        return headers;
      },
    });

    const result = await baseQuery(args, api, extraOptions);

    // if (result.data) {
    //   updateCache(url, result.data);
    // }

    return result;
  },
  tagTypes: Object.values(API_TAGS) as string[],
  endpoints: () => ({}),
});

export default baseApi;
