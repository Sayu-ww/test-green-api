import type { AuthFormTypes } from '@widgets/auth-form'

export type FormInput = {
  name: keyof AuthFormTypes.Utils.FormState
  placeholder: string
  type: string
}
