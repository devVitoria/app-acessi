import { api } from "..";
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
  VerifyCodeReq,
  VerifyCodeRes,
  VerifyTokenRes,
} from "./interface";

export const register = async (data: RegisterReq) => {
  try {
    const response = await api.post<RegisterRes>("/auth/register", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao registrar");
  }
};

export const login = async (data: LoginReq) => {
  try {
    const response = await api.post<LoginRes>("/auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao fazer login");
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

export const verifyToken = async (token: string) => {
  try {
    const response = await api.post<VerifyTokenRes>("/auth/verify-token", {
      token,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao validar código");
  }
};
