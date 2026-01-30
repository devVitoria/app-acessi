import { api } from "..";
import { SendMessageChatReq, SentMessagesChatRes } from "./utils/interface";

export const sendMessageChat = async (data: SendMessageChatReq) => {
  try {
    console.log("Oxi carai ta vindo pra ca");
    const response = await api.post<any>("/financial/finance-chat", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao enviar código");
  }
};

export const sentMessagesChat = async (cpf: string) => {
  try {
    const response = await api.get<SentMessagesChatRes[]>(
      "/financial/finance-chat",
      {
        params: { cpf },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao enviar código");
  }
};
