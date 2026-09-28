import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatApi } from '@units/chat'
import { chatHistoryQueryKey } from '../queries'

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ChatApi.Methods.PostSendMessage,
    onSuccess: (_response, payload) =>
      queryClient.invalidateQueries({ queryKey: chatHistoryQueryKey(payload.chatId) }),
  })
}
