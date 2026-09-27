import { Utils } from '@shared/lib'
import type { Ui } from '@shared/types'
import clsx from 'clsx'

const ColorClassNames = {
  primary: 'text-white bg-glaucous-400 hover:bg-ubc-blue-500',
  secondary: 'text-glaucous-400 bg-glaucous-50 hover:text-black hover:bg-white',
  none: '',
} as const

type Color = keyof typeof ColorClassNames

const SizeClassNames = {
  sm: 'py-3 px-4',
  md: 'py-2 px-4 md:py-3 md:px-6',
  none: '',
} as const

type Size = keyof typeof SizeClassNames

type Variant = Ui.UiVariant<[['color', Color], ['size', Size]]>
type SplittedVariant = [Color, Size | undefined]

type Props = React.ComponentPropsWithRef<'button'> & {
  variant?: Variant
}

export const Button = (props: Props) => {
  const { variant = 'color:none', className, ...restProps } = props

  const [color, size = 'none'] = Utils.splitVariant(variant) as SplittedVariant

  return (
    <button
      className={clsx(
        'cursor-pointer disabled:cursor-not-allowed disabled:opacity-70',
        ColorClassNames[color],
        SizeClassNames[size],
        color !== 'none' && 'rounded-2.5xl text-center font-semibold transition-colors',
        className,
      )}
      {...restProps}
    />
  )
}
