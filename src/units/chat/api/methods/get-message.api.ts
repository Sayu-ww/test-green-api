import { SharedApi } from '@shared'
import { ChatService } from '@units/chat'
import type { ChatHistoryMessage } from './get-chat-history.api'

export type GetMessagePayload = {
  chatId: string
  idMessage: string
}

export async function getMessage(payload: GetMessagePayload): Promise<ChatHistoryMessage> {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore.getState()
  const path = `/waInstance${idInstance}/getMessage/${apiTokenInstance}`

  const res = await SharedApi.Clients.baseClient.post<ChatHistoryMessage>(path, payload)

  return res.data
}

export const GetMessage = getMessage
