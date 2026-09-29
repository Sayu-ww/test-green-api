import { SharedApi } from '@shared'
import { ChatService } from '@units/chat'

export type ChatInfo = {
  id?: string
  chatId?: string
  name: string
  type: string
  phoneNumber: number
  notSpam?: boolean
  notInSpam?: boolean
}

export async function getChats(): Promise<ChatInfo[]> {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore.getState()

  const path = `/waInstance${idInstance}/getChats/${apiTokenInstance}`

  const res = await SharedApi.Clients.baseClient.get(path)

  return res.data
}

export const GetChats = getChats
