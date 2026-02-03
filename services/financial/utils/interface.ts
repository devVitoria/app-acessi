export interface SendMessageChatReq {
  value: number;
  reason: string;
  cpf: string;
  category?: number | null;
  token?: string;
}

export interface SentMessagesChatRes {
  id: number;
  userId: number;
  reason: string;
  value: number;
  category: number | null;
  created_at: string;
  updated_at: string;
}
