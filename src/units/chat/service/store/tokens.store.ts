import { create } from 'zustand'

type Tokens = {
  idInstance: number
  apiTokenInstance: string
  phone?: string
  chatId: string

  setTokens: (tokens: Pick<Tokens, 'idInstance' | 'apiTokenInstance' | 'phone' | 'chatId'>) => void
}

export const useTokensStore = create<Tokens>((set) => ({
  idInstance: 0,
  apiTokenInstance: '',
  phone: '',
  chatId: '',

  setTokens: (tokens) => set(tokens),
}))
