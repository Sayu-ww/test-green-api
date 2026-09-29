import type { AuthFormTypes } from '@widgets/auth-form'

export const INPUTS: AuthFormTypes.Ui.FormInput[] = [
  {
    name: 'idInstance',
    placeholder: 'idInstance',
    type: 'text',
  },
  {
    name: 'apiTokenInstance',
    placeholder: 'apiTokenInstance',
    type: 'password',
  },
]
