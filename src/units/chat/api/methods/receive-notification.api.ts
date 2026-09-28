import { SharedApi } from '@shared'
import { ChatService } from '@units/chat'

export type GreenApiNotification = {
  typeWebhook: string
  senderData?: {
    chatId?: string
  }
}

export type ReceiveNotificationResult = {
  receiptId: number
  body: GreenApiNotification
}

export async function receiveNotification(receiveTimeout = 5): Promise<ReceiveNotificationResult | null> {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore.getState()
  const path = `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`

  const res = await SharedApi.Clients.baseClient.get<ReceiveNotificationResult | null>(path, {
    params: { receiveTimeout },
  })

  return res.data && typeof res.data.receiptId === 'number' ? res.data : null
}

export const ReceiveNotification = receiveNotification
