import type { Join } from '../utils'

export type UiVariant<T extends string[][]> = T extends []
  ? ''
  : T extends [infer UiVariantPart extends string[], ...infer Rest extends string[][]]
    ?
        | Join<UiVariantPart, ':'>
        | `${Join<UiVariantPart, ':'>}${UiVariant<Rest> extends '' ? '' : ` ${UiVariant<Rest>}`}`
    : never
