import clsx from 'clsx'

export const Paper = (props: React.ComponentProps<'div'>) => {
  const { className, ...restProps } = props

  return <div className={clsx('rounded-5xl', className)} {...restProps} />
}
