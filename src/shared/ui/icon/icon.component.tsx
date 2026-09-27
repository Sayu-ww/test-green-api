import { Suspense, lazy } from 'react'

const Icons = {
  // icon: lazy(() => import('@assets/icons/icon.svg?react')),
  favicon: lazy(() => import('@assets/icons/favicon.svg?react')),
} as const

export type IconName = keyof typeof Icons

type IconProps = React.SVGAttributes<SVGElement> & {
  name: IconName
}

export function Icon(props: IconProps) {
  const { name, ...restProps } = props

  const Icon = Icons[name] as React.FC<React.SVGProps<SVGSVGElement>>

  return Icon ? (
    <Suspense fallback={null}>
      <Icon role="img" {...restProps} />
    </Suspense>
  ) : null
}
