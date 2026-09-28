import { useQuery } from '@tanstack/react-query'

import { Methods } from '@units/chat/api'

export const chatHistoryQueryKey = (chatId: string) => ['chat', 'history', chatId] as const

export const useGetChatHistory = (chatId: string, count = 100) =>
  useQuery({
    queryKey: [...chatHistoryQueryKey(chatId), count],
    queryFn: () => Methods.GetChatHistory({ chatId, count }),
    enabled: Boolean(chatId),
  })
