import { RegisterProps } from "@/components/interface";

export interface RegisterRes {
  message: string;
  token: string;
}

export interface RegisterReq extends RegisterProps {}

export interface VerifyCodeRes {
  status: string;
  message: string;
}

export interface VerifyCodeReq {
  code: string;
  cpf: string;
}
