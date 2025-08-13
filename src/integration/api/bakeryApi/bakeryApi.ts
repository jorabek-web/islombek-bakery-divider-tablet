import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  AddDividerRequest,
  AddDividerResponse,
  AddDividerSalaryRequest,
  AddDividerSalaryResponse,
  BakeryBakeRequest,
  BakeryBakeResponse,
  BakeryBreadsRequest,
  BakeryBreadsResponse,
  BakeryDivideRequest,
  BakeryDivideResponse,
  BakeryDivideUpdateRequest,
  BakeryDivideUpdateResponse,
  BakeryDoughResponse,
  BakeryDoughsRequest,
  BakeryRedirectRequest,
  BakeryRedirectResponse,
  BakeryRequest,
  BakeryResponse,
  DivideRequest,
  DivideResponse,
  SalaryRequest,
  SalaryResponse,
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
    bakerySalary: build.query<SalaryResponse, SalaryRequest>({
      query: ({ id }) => ({
        url: PATHS.SALARY + id,
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
    AddDivider: build.mutation<AddDividerResponse, AddDividerRequest>({
      query: ({ id, user }) => ({
        url: PATHS.DIVIDER + id + PATHS.ADD,
        method: "PATCH",
        body: { user },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),

    AddDividerSalary: build.mutation<
      AddDividerSalaryResponse,
      AddDividerSalaryRequest
    >({
      query: ({ id, user, salary }) => ({
        url: PATHS.DIVIDER + id + PATHS.ADD_SALARY,
        method: "PATCH",
        body: { user, salary },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
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

    bakeryDivideUpdate: build.mutation<
      BakeryDivideUpdateResponse,
      BakeryDivideUpdateRequest
    >({
      query: ({ id, bakerRoomId, dough_ball_count, divided_by_workers }) => ({
        url: "/dough/" + id + PATHS.BAKERY_DIVIDE_UPDATE,
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
        url: `/dough/${bakerRoomId}/${id}${PATHS.BAKERY_REDIRECT}`,
        method: "PATCH",
        body: { transferred_driver },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
    divideRedirect: build.mutation<
      BakeryRedirectResponse[],
      BakeryRedirectRequest
    >({
      query: ({ id, bakerRoomId, transferred_driver }) => ({
        url: `/dough-ball/${bakerRoomId}/${id}${PATHS.DIVIDE_REDIRECT}`,
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
  useBakeryDivideUpdateMutation,
  useBakeryBakeMutation,
  useBakeryRedirectMutation,
  useDivideQuery,
  useBakerySalaryQuery,
  useAddDividerMutation,
  useAddDividerSalaryMutation,
  useDivideRedirectMutation,
} = BakeryApi;
