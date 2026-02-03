import { api } from "..";
import { SendMessageChatReq, SentMessagesChatRes } from "./utils/interface";

export const sendMessageChat = async (data: SendMessageChatReq) => {
  try {
    const response = await api.post<any>("/financial/finance-chat", data, {
      headers: {
        Authorization: "Bearer " + (data?.token ?? ""),
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao enviar código");
  }
};

export const sentMessagesChat = async (cpf: string, token?: string) => {
  try {
    const response = await api.get<SentMessagesChatRes[]>(
      "/financial/finance-chat",

      {
        headers: {
          Authorization: "Bearer " + (token ?? ""),
        },
        params: { cpf },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao enviar código");
  }
};
