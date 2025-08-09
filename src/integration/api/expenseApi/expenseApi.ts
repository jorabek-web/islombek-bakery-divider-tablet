import { API_TAGS } from "@/constants/ApiTags";
import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import { CreateExpenseRequest, CreateExpenseResponse, GetExpensesResponse } from "./types";

export const ExpenseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getExpenses: build.query<GetExpensesResponse[], object>({
            query: () => ({
                url: PATHS.EXPENSE,
                method: "GET",
            }),
            providesTags: [API_TAGS.EXPENSE]
        }),
        createExpense: build.mutation<CreateExpenseResponse, CreateExpenseRequest>({
            query: ({ receiver, reason, amount, comment }) => ({
                url: PATHS.EXPENSE,
                method: "POST",
                body: { receiver, reason, amount, comment },
            }),
            invalidatesTags: [API_TAGS.EXPENSE],
        }),
        updateExpense: build.mutation<CreateExpenseResponse, { id: string, receiver?: string, reason?: string, amount?: number, comment?: string }>({
            query: ({ id, amount, reason, receiver, comment }) => ({
                url: `${PATHS.EXPENSE}/${id}`,
                method: "PATCH",
                body: { amount, reason, receiver, comment },
            }),
            invalidatesTags: [API_TAGS.EXPENSE],

        }),
        deleteExpense: build.mutation<CreateExpenseResponse, string>({
            query: (id) => ({
                url: `${PATHS.EXPENSE}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [API_TAGS.EXPENSE],
        }),
    })
})

export const { useGetExpensesQuery, useCreateExpenseMutation, useDeleteExpenseMutation, useUpdateExpenseMutation } = ExpenseApi