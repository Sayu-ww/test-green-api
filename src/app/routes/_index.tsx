import { SharedUi } from '@shared'

export default function IndexRoute() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center p-4">
      <SharedUi.Icon name="favicon" className="mb-4 size-20" />
      <h1>Welcome to the Index Route</h1>
      <p>This is the main landing page of the application.</p>
    </div>
  )
}
