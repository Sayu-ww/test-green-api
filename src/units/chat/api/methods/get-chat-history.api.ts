import { SharedApi } from '@shared'
import { ChatService } from '@units/chat'

export type GetChatHistoryPayload = {
  chatId: string
  count?: number
}

export type ChatHistoryMessage = {
  idMessage: string
  timestamp: number
  type: string
  chatId: string
  textMessage?: string
  extendedTextMessage?: {
    text: string
  }
}

export async function getChatHistory(payload: GetChatHistoryPayload): Promise<ChatHistoryMessage[]> {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore.getState()

  const path = `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`

  const res = await SharedApi.Clients.baseClient.post(path, payload)

  return res.data
}

export const GetChatHistory = getChatHistory
