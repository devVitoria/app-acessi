import { RegisterProps } from "@/components/interface"

export interface RegisterRes {
    message: string
    token: string
}

export interface RegisterReq extends RegisterProps {}