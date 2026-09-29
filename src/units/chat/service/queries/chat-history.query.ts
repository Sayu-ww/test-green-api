import { type QueryClient, useQuery } from '@tanstack/react-query'
import { ChatApi } from '@units/chat'

export const chatHistoryRootQueryKey = ['chat', 'history'] as const
export const chatHistoryQueryKey = (chatId: string) => [...chatHistoryRootQueryKey, chatId] as const

export const upsertChatHistoryMessage = (
  queryClient: QueryClient,
  chatId: string,
  message: ChatApi.Methods.ChatHistoryMessage,
  count = 100,
) => {
  queryClient.setQueryData<ChatApi.Methods.ChatHistoryMessage[]>(
    [...chatHistoryQueryKey(chatId), count],
    (current) => [...(current ?? []).filter((item) => item.idMessage !== message.idMessage), message],
  )
}

export const useGetChatHistory = (chatId: string, count = 100) =>
  useQuery({
    queryKey: [...chatHistoryQueryKey(chatId), count],
    queryFn: () => ChatApi.Methods.GetChatHistory({ chatId, count }),
    enabled: Boolean(chatId),
  })
