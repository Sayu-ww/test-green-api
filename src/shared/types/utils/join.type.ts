export type Join<Array extends readonly string[], Separator extends string> = Array extends []
  ? ''
  : Array extends [infer Item]
    ? Item
    : Array extends [infer Item, ...infer Rest extends readonly string[]]
      ? `${Item & string}${Separator}${Join<Rest, Separator>}`
      : string
