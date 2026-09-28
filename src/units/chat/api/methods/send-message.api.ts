import { SharedApi } from '@shared'
import { ChatService } from '@units/chat'

export type Payload = {
  chatId: string
  message: string
  typingTime: number
}

type PostMessageResponse = {
  idMessage: number
}

export async function postSendMessage(payload: Payload): Promise<PostMessageResponse> {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore.getState()

  const path = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`

  const res = await SharedApi.Clients.baseClient.post(path, payload)
  return res.data
}

export const PostSendMessage = postSendMessage
