import { useQuery } from '@tanstack/react-query'

import { ChatService } from '@units/chat'
import { Methods } from '@units/chat/api'

export const receiveNotificationQueryKey = (idInstance: number) =>
  ['chat', 'notifications', idInstance] as const

export const useReceiveNotification = () => {
  const { idInstance, apiTokenInstance } = ChatService.Store.useTokensStore()

  return useQuery({
    queryKey: receiveNotificationQueryKey(idInstance),
    queryFn: () => Methods.ReceiveNotification(),
    enabled: Boolean(idInstance && apiTokenInstance),
    refetchInterval: (query) => (query.state.data ? false : 250),
  })
}
