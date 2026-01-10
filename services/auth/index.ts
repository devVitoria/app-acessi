import { api } from "..";
import { RegisterReq, RegisterRes } from "./interface";

export const register = async (data: RegisterReq) => {
 try {
      const response = await api.post<RegisterRes>(
        '/auth/register',
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar');
    }
}