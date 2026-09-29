import { AuthFormUi } from '@widgets/auth-form'

export default function AuthPage() {
  return (
    <section className="bg-primary flex min-h-screen items-center justify-center">
      <AuthFormUi.AuthForm />
    </section>
  )
}
