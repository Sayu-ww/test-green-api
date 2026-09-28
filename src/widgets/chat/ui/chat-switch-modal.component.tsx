import { SharedUi } from '@shared'

type Props = {
  isOpen: boolean
  phone: string
  error: string
  isLoading: boolean
  onPhoneChange: (value: string) => void
  onClose: () => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function ChatSwitchModal(props: Props) {
  const { isOpen, phone, error, isLoading, onPhoneChange, onClose, onSubmit } = props

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-surface w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white">Сменить чат</h2>
        <p className="text-muted mt-2 text-sm">Введите номер телефона, чтобы зайти в другой WhatsApp-чат.</p>

        <form onSubmit={onSubmit} className="mt-5">
          <SharedUi.Input
            placeholder="79123456789"
            type="text"
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            className="w-full"
          />

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="mt-5 flex gap-3">
            <SharedUi.Button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-white"
            >
              Отмена
            </SharedUi.Button>
            <SharedUi.Button
              type="submit"
              disabled={!phone.trim() || isLoading}
              className="bg-message hover:bg-message/80 flex-1 rounded-xl px-4 py-2 text-white"
            >
              {isLoading ? 'Загрузка чатов...' : 'Войти'}
            </SharedUi.Button>
          </div>
        </form>
      </div>
    </div>
  )
}
