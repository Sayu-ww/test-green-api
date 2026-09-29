import { SharedUi } from '@shared'
import { ChatService } from '@units/chat'
import { AuthFormLib, type AuthFormTypes } from '@widgets/auth-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function AuthForm() {
  const setTokens = ChatService.Store.useTokensStore((state) => state.setTokens)

  const { refetch } = ChatService.Queries.useChats()

  const [form, setForm] = useState<AuthFormTypes.Utils.FormState>({
    idInstance: '',
    apiTokenInstance: '',
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    setTokens({
      idInstance: Number(form.idInstance),
      apiTokenInstance: form.apiTokenInstance,
      phone: '',
      chatId: '',
    })

    const { error } = await refetch()

    if (error) {
      setError('Не удалось получить список чатов. Проверьте idInstance и apiTokenInstance.')
      setIsSubmitting(false)
      return
    }

    navigate('/chat')
    setIsSubmitting(false)
  }

  const handleChange = (name: keyof AuthFormTypes.Utils.FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary flex w-full max-w-md flex-col items-center rounded-lg p-8 shadow-lg"
    >
      <h1 className="text-center text-5xl font-bold">Green API</h1>

      <div className="mt-8 flex w-full flex-col gap-4">
        {AuthFormLib.Constants.INPUTS.map(({ name, ...input }) => (
          <SharedUi.Input
            key={name}
            requeued
            {...input}
            value={form[name]}
            onChange={(event) => handleChange(name, event.target.value)}
          />
        ))}
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
  )
}
