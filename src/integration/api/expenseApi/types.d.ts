import { ProfileResponse } from "../authApi/types"

interface GetExpensesResponse {
    _id: string
    branch: string
    status: string
    user: ProfileResponse
    receiver?: ProfileResponse
    amount: number
    reason?: GetReasonsResponse
    comment?: string
    createdAt: string
    updatedAt: string
}

interface CreateExpenseResponse {
    branch: string
    status: string
    user: string
    receiver: string
    amount: number
    reason: string
    _id: string
    createdAt: string
    updatedAt: string
}

interface CreateExpenseRequest {
    receiver?: string
    reason?: string
    amount: number
    comment?: string
}