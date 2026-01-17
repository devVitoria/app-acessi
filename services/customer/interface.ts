export interface SendCodeRes {
  message: string;
  receiver: string;
}

export interface SendCodeReq {
  cpf: string;
}

export interface VerifyCodeRes {
  status: string;
  message: string;
}

export interface VerifyCodeReq {
  code: string;
  cpf: string;
}

export interface ResetPasswordReq {
  newPsd: string;
  cpf: string;
}
