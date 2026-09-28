import { Utils } from '@shared/lib'
import type { Ui } from '@shared/types'
import clsx from 'clsx'

const ColorClassNames = {
  primary: '',
  secondary: '',
  none: '',
} as const

type Color = keyof typeof ColorClassNames

type Variant = Ui.UiVariant<[['color', Color]]>
type SplittedVariant = [Color]

type Props = {
  variant?: Variant
  placeholder?: string
  type?: React.HTMLInputTypeAttribute | undefined
  disabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const Input = (props: Props) => {
  const {
    variant = 'color:none',
    placeholder,
    disabled,
    value,
    type,
    onChange,
    className,
    ...restProps
  } = props

  const [color] = Utils.splitVariant(variant) as SplittedVariant

  return (
    <input
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={clsx(
        'rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:border-1 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        ColorClassNames[color],
        className,
      )}
      {...restProps}
    />
  )
}
