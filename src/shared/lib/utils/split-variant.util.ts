export const splitVariant = (variant: string) =>
  variant.split(' ').map((variantPart) => variantPart.split(':').at(1) ?? '')
