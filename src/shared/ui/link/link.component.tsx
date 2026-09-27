import { Utils } from '@shared/lib'
import type { Ui } from '@shared/types'
import clsx from 'clsx'
import { Link as RRLink, type LinkProps as RRLinkProps } from 'react-router'

const ColorClassNames = {
  primary: 'text-ubc-blue-500 hover:text-glaucous-400',
  secondary: 'text-white hover:text-glaucous-400 underline underline-offset-4',
  none: '',
} as const

type Color = keyof typeof ColorClassNames

type Variant = Ui.UiVariant<[['color', Color]]>
type SplittedVariant = [Color]

type Props = RRLinkProps & {
  variant?: Variant
}

export const Link = (props: Props) => {
  const { variant = 'color:none', className, ...restProps } = props

  const [color] = Utils.splitVariant(variant) as SplittedVariant

  return (
    <RRLink
      className={clsx(
        ColorClassNames[color],
        color !== 'none' && 'font-semibold transition-colors',
        className,
      )}
      {...restProps}
    />
  )
}
