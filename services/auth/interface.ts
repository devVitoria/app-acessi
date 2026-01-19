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

export interface LoginRes {
  message: string;
  token: string;
}

export interface LoginReq {
  cpf: string;
  password: string;
}
