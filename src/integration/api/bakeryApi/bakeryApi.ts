import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  BakeryBakeRequest,
  BakeryBakeResponse,
  BakeryBreadsRequest,
  BakeryBreadsResponse,
  BakeryDivideRequest,
  BakeryDivideResponse,
  BakeryDoughResponse,
  BakeryDoughsRequest,
  BakeryRedirectRequest,
  BakeryRedirectResponse,
  BakeryRequest,
  BakeryResponse,
  DivideRequest,
  DivideResponse,
} from "./types";

export const BakeryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bakery: build.query<BakeryResponse, BakeryRequest>({
      query: ({ id }) => ({
        url: PATHS.BAKERY + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    singleBakery: build.query<BakeryResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${PATHS.BAKERY}/${id}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    bakeryDoughs: build.query<BakeryDoughResponse[], BakeryDoughsRequest>({
      query: ({ id }) => ({
        url: PATHS.BAKERY_DOUGHES + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    divide: build.query<DivideResponse[], DivideRequest>({
      query: ({ id }) => ({
        url: PATHS.DIVIDE + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    bakeryBreads: build.query<BakeryBreadsResponse, BakeryBreadsRequest>({
      query: ({ bakeryId, breadStatus, doughStatus }) => ({
        url: PATHS.BAKERY_BREADS,
        params: { bakery: bakeryId, breadStatus, doughStatus },
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    bakeryDivide: build.mutation<BakeryDivideResponse[], BakeryDivideRequest>({
      query: ({ id, bakerRoomId, dough_ball_count, divided_by_workers }) => ({
        url: "/dough/" + id + PATHS.BAKERY_DIVIDE,
        params: { bakerRoomId },
        method: "PATCH",
        body: { dough_ball_count, divided_by_workers },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),

    bakeryBake: build.mutation<BakeryBakeResponse[], BakeryBakeRequest>({
      query: ({ dough, baked, baker }) => ({
        url: PATHS.BAKERY_BAKE,
        method: "POST",
        body: { dough, baked, baker },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
    bakeryRedirect: build.mutation<
      BakeryRedirectResponse[],
      BakeryRedirectRequest
    >({
      query: ({ id, bakerRoomId, transferred_driver }) => ({
        url: `/dough/${id}/${bakerRoomId}${PATHS.BAKERY_REDIRECT}`,
        method: "PATCH",
        body: { transferred_driver },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
  }),
});

export const {
  useBakeryQuery,
  useSingleBakeryQuery,
  useLazyBakeryDoughsQuery,
  useLazyBakeryBreadsQuery,
  useBakeryDoughsQuery,
  useBakeryBreadsQuery,
  useBakeryDivideMutation,
  useBakeryBakeMutation,
  useBakeryRedirectMutation,
  useDivideQuery,
} = BakeryApi;
