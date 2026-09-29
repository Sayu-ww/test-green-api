import { useQuery } from '@tanstack/react-query'
import { ChatApi } from '@units/chat'

export const chatsQueryKey = ['chat', 'chats'] as const

export const useGetChats = () =>
  useQuery({
    queryKey: chatsQueryKey,
    queryFn: ChatApi.Methods.GetChats,
  })
