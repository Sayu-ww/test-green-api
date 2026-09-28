import { SharedUi } from '@shared'
import { ChatApi, ChatService } from '@units/chat'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function AuthPage() {
  const setTokens = ChatService.Store.useTokensStore((state) => state.setTokens)

  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    setTokens({
      idInstance: Number(idInstance),
      apiTokenInstance,
      phone: '',
      chatId: '',
    })

    try {
      await ChatApi.Methods.GetChats()
      navigate('/chat')
    } catch {
      setError('Не удалось получить список чатов. Проверьте idInstance и apiTokenInstance.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-primary flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-secondary flex w-full max-w-md flex-col items-center rounded-lg p-8 shadow-lg"
      >
        <h1 className="text-center text-5xl font-bold">Green API</h1>

        <div className="mt-8 flex w-full flex-col gap-4">
          <SharedUi.Input
            placeholder="idInstance"
            type="text"
            value={idInstance}
            onChange={(event) => setIdInstance(event.target.value)}
          />

          <SharedUi.Input
            placeholder="apiTokenInstance"
            type="password"
            value={apiTokenInstance}
            onChange={(event) => setApiTokenInstance(event.target.value)}
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 w-full text-sm text-red-400">
            {error}
          </p>
        )}

        <SharedUi.Button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent mt-8 w-full rounded-md py-2"
        >
          {isSubmitting ? 'Проверка...' : 'Login'}
        </SharedUi.Button>
      </form>
    </div>
  )
}
