import { ProfileResponse } from "../authApi/types"

interface CreateOrdersResponse {
    _id: string
}

interface CreateOrdersRequest {
    bakery: string
    amount: number
    cost?: number
    customer?: string
    comment?: string
    phone?: string
    location?: string
    debt?: number
    branch?: string
    driver?: string
    baker?: string
    status?: string
}


interface GetOrdersResponse {
    _id: string
    branch?: string
    status?: string
    location?: string
    amount: number
    debt: number
    cost?: number
    customer?: ProfileResponse
    baker?: ProfileResponse
    delivery?: ProfileResponse
    createdAt?: string
    updatedAt?: string
}

interface GetOrdersRequest {
    status: string[]
}