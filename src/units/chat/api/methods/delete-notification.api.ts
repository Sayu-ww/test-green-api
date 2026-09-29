import { SharedApi } from '@shared'
import { ChatService } from '@units/chat'

export type DeleteNotificationResult = {
  result: boolean
  reason: string
}

export async function deleteNotification(receiptId: number): Promise<DeleteNotificationResult> {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore.getState()
  const path = `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`

  const res = await SharedApi.Clients.baseClient.delete<DeleteNotificationResult>(path)

  return res.data
}

export const DeleteNotification = deleteNotification
