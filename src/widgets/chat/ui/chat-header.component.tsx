import { SharedUi } from '@shared'

type Props = {
  phone: string
  onOpenModal: () => void
}

export function ChatHeader(props: Props) {
  const { phone, onOpenModal } = props

  return (
    <header className="bg-secondary mx-auto h-max w-full max-w-3xl rounded-t-md border border-b-0 border-white/10 p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full border-2 border-white p-2">
              <SharedUi.Icon name="profile" className="size-7 text-white" />
            </div>

            <span className="text-sm font-semibold text-white">
              {phone ? `+${phone}` : 'Номер не выбран'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SharedUi.Button
            type="button"
            onClick={onOpenModal}
            aria-label="Сменить чат"
            className="bg-message hover:bg-message/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition disabled:cursor-not-allowed"
          >
            <span className="text-lg">⇄</span>
          </SharedUi.Button>
          <SharedUi.Button
            type="button"
            onClick={() => window.location.assign('/')}
            aria-label="Выйти из чата"
            className="bg-transparent px-3 py-2 text-sm text-white/80 transition hover:text-white"
          >
            Выйти
          </SharedUi.Button>
        </div>
      </div>
    </header>
  )
}
