import clsx from 'clsx'

const Sources = {
  // 'image': '/assets/images/image.png',
  none: undefined,
} as const

export type SourceName = keyof typeof Sources

type Props = React.ComponentPropsWithRef<'img'> & {
  srcName?: SourceName
}

export const Image = (props: Props) => {
  const { srcName = 'none', src, alt, className, ...restProps } = props

  return (
    <img
      src={src ?? Sources[srcName]}
      alt={alt ?? srcName}
      className={clsx('object-cover object-center', className)}
      {...restProps}
    />
  )
}
