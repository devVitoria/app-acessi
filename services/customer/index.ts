import { api } from "..";
import {
  ResetPasswordReq,
  SendCodeReq,
  SendCodeRes,
  VerifyCodeReq,
  VerifyCodeRes,
} from "./interface";

export const sendCode = async (data: SendCodeReq) => {
  try {
    const response = await api.post<SendCodeRes>("/customer/send-code", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao enviar código");
  }
};

export const verifyCode = async (data: VerifyCodeReq) => {
  try {
    const response = await api.post<VerifyCodeRes>(
      "/customer/verify-code",
      data,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao validar código");
  }
};

export const resetPassword = async (data: ResetPasswordReq) => {
  try {
    const response = await api.post("/customer/reset-password", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao alterar a senha");
  }
};
