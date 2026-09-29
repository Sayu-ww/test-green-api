import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatApi, ChatService } from '@units/chat'

export type DeleteNotificationPayload = {
  receiptId: number
  chatId?: string
}

export const useDeleteNotificationMutation = () => {
  const queryClient = useQueryClient()
  const idInstance = ChatService.Store.useTokensStore((state) => state.idInstance)

  return useMutation({
    mutationFn: ({ receiptId }: DeleteNotificationPayload) => ChatApi.Methods.DeleteNotification(receiptId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ChatService.Queries.receiveNotificationQueryKey(idInstance),
      })

      return queryClient.invalidateQueries({
        queryKey: ChatService.Queries.chatHistoryRootQueryKey,
      })
    },
  })
}
