import { useQuery } from '@tanstack/react-query'

import { Methods } from '@units/chat/api'

export const chatsQueryKey = ['chat', 'chats'] as const

export const useGetChats = () =>
  useQuery({
    queryKey: chatsQueryKey,
    queryFn: Methods.GetChats,
  })
