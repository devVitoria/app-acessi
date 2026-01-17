import { api } from "..";
import {
  RegisterReq,
  RegisterRes,
  VerifyCodeReq,
  VerifyCodeRes,
} from "./interface";

export const register = async (data: RegisterReq) => {
  try {
    const response = await api.post<RegisterRes>("/auth/register", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao registrar");
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
    console.log("Erorrr", error);
    throw new Error(error.response?.data?.message || "Erro ao validar código");
  }
};
