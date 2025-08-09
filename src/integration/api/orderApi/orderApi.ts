import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import { CreateOrdersRequest, CreateOrdersResponse, GetOrdersRequest, GetOrdersResponse } from "./types";

export const OrderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation<CreateOrdersResponse, CreateOrdersRequest>({
            query: ({ bakery, amount, cost, customer, comment, phone, location, debt, branch, driver, baker, status }) => ({
                url: PATHS.ORDER,
                method: "POST",
                body: { bakery, amount, cost, customer, comment, phone, location, debt, branch, driver, baker, status },
            }),
            invalidatesTags: [API_TAGS.SALE]
        }),
        getOrders: build.query<GetOrdersResponse[], GetOrdersRequest>({
            query: ({ status }) => ({
                url: PATHS.ORDER,
                method: "GET",
                params: { status }
            }),
            providesTags: [API_TAGS.SALE]
        }),
        singleOrder: build.query<GetOrdersResponse, string>({
            query: (id) => ({
                url: PATHS.SINGLE_ORDER.replace(":id", id),
                method: "GET",
            }),
            providesTags: [API_TAGS.SALE]
        }),
        deleteOrder: build.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: PATHS.SINGLE_ORDER.replace(":id", id),
                method: "DELETE",
            }),
        }),
        updateOrder: build.mutation<void, { id: string, debt: number }>({
            query: ({ id, debt }) => ({
                url: PATHS.SINGLE_ORDER.replace(":id", id),
                method: "PATCH",
                body: { debt },
            }),
            invalidatesTags: [API_TAGS.SALE]
        }),
    }),
});

export const { useGetOrdersQuery, useLazyGetOrdersQuery, useCreateOrderMutation, useSingleOrderQuery, useDeleteOrderMutation, useUpdateOrderMutation } = OrderApi;
