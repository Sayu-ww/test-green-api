# Project General Coding Guidelines

## Architecture Overview

This project follows a layered architecture with strict import rules and clear separation of concerns.

## Core Concepts

### Layers (Vertical Segmentation)

- **Hierarchy**: `app ← widgets ← units ← shared`
- **Rule**: Code can only import from same layer or lower layers
- **shared**: Foundation - UI kit, types, utilities, constants
- **units**: Business domains (user, order, product, etc.)
- **widgets**: Reusable page sections with complex logic
- **app**: Application-level code and routing

### Contexts (Horizontal Segmentation)

Isolated parts within a layer, grouped by functional/business domain:

- `units/user/`, `units/order/`, `units/product/`
- `app/` and `shared/` are themselves contexts

### Segments (Functional Segmentation)

- **Hierarchy**: `ui ← service ← api ← lib ← types`
- **types**: Reusable TypeScript types
- **lib**: Infrastructure code (constants, utilities, enums)
- **api**: HTTP requests and API methods
- **service**: Business logic (hooks, stores, providers)
- **ui**: React components

## Naming Conventions

### Files & Folders

- **kebab-case** for all files and folders
- Pattern: `[context-]name.extension`
- Omit layer name from file names

### Code Elements

- **PascalCase**: Components, types, exported entities
- **camelCase**: Functions (non-components), local variables
- **Function names**: Start with verb in Present Simple (`fetchData`, `validateForm`)
- **Boolean flags**: Form as questions (`isLoading`, `hasError`, `shouldRender`)

## Import Rules

### Public API Only

Always import through `index.ts` public API:

```typescript
// ✅ GOOD: Import through Public API
import { UserUi, UserApi } from '@units/user'
import { SharedLib } from '@shared'

// ❌ BAD: Direct file imports
import { UserCard } from '@units/user/ui/card/user-card.component'
import { formatDate } from '@units/user/lib/utils/format-date.util'
```

### Cross-Context Rules

```typescript
// ✅ GOOD: Import context Public API
import { BLib, BService } from '@units/B'

// ❌ BAD: Import segments from another context
import { Constants } from '@units/B/lib'
```

### Same Context Rules

```typescript
// ✅ GOOD: Import segments within same context
import { Constants } from '@units/A/lib'
import { Servitors } from '@units/A/service'
```

## File Structure Patterns

### UI Components

```
ui/
  component-name/
    component-name.component.tsx
    index.ts
```

**Component example:**

```typescript
// ui/card/card.component.tsx
import clsx from 'clsx'

type Props = React.PropsWithChildren<{
  className?: string
}>

export const Card = (props: Props) => {
  const { className, ...restProps } = props
  return <div className={clsx('p-5', className)} {...restProps} />
}
```

**Public API:**

```typescript
// ui/card/index.ts
export { Card } from './card.component.tsx'
```

### Nested Components

```
ui/
  parent-component/
    child-component/
      parent-child-component.component.tsx
      index.ts  // exports: ChildComponent as Child
    parent-component.component.tsx
    index.ts
```

**Note:** Nested components that are tightly coupled to parent should be in the same folder but not exported through parent's `index.ts` (remain internal).

### Types

- One file → one type (or group of related types)
- Extension: `.type.ts`
- Location: `types/context-example.type.ts`
- Export naming: Use type aliases for shortened names in public API

**Example:**

```typescript
// types/case-item.type.ts
export type CaseItem = {
  /* ... */
}
export type CaseItemCard = CaseItemCardLg | CaseItemCardSm

// types/index.ts
export type { CaseItem as Item, CaseItemCard as ItemCard } from './case-item.type'
```

### API Structure

```
api/
  interceptors/  // request/response lifecycle (.interceptor.ts)
  clients/       // low-level operations (.client.ts)
  methods/       // context methods - one file per function
```

### Service Structure

```
service/
  hooks/         // general purpose hooks (.hook.ts)
  servitors/     // non-hook functions (.servitor.ts)
  stores/        // global state (.store.ts)
  queries/       // data fetching state (.query.ts)
  mutations/     // data modification (.mutation.ts)
```

## Namespace Usage

Group exports using named exports to avoid naming collisions:

```typescript
// Context-level namespaces (shared/index.ts, units/case/index.ts)
export * as SharedUi from './ui'
export * as SharedTypes from './types'
export * as SharedLib from './lib'

export * as CaseUi from './ui'
export * as CaseTypes from './types'

// Segment-level namespaces (shared/lib/index.ts)
export * as Constants from './constants'
export * as Utils from './utils'
```

**Pattern:**

- Use `type *` for type-only re-exports: `export type * as SharedTypes from './types'`
- Maintain consistent naming: `[Context][Segment]` (e.g., `SharedUi`, `CaseTypes`)

## Component Props Patterns

### Standard Props Structure

```typescript
// Use React built-in types for base HTML elements
type Props = React.ComponentProps<'div'> & {
  variant?: Variant
}

// For refs support
type Props = React.ComponentPropsWithRef<'button'> & {
  variant?: Variant
}

// For children
type Props = React.PropsWithChildren<{
  className?: string
}>

// Custom helper types (from shared/types)
type Props = SharedTypes.Ui.PropsWithClassName<{
  item: Item
}>
```

### Props Destructuring

Always destructure props inside function body, not in parameters:

```typescript
// ✅ GOOD
export const Component = (props: Props) => {
  const { className, variant = 'default', ...restProps } = props
  return <div className={className} {...restProps} />
}

// ❌ BAD
export const Component = ({ className, variant = 'default', ...restProps }: Props) => {
  return <div className={className} {...restProps} />
}
```

## Implementation Guidelines for Copilot

### When creating components:

1. Place in dedicated folder with `component.tsx` + `index.ts`
2. Use PascalCase for component names
3. Export through Public API only
4. Use TypeScript with proper Props typing
5. Destructure props inside function body, not parameters
6. Use spread operator for rest props: `{...restProps}`

### When creating functions:

1. Prefer inline arrow functions
2. Decompose args only inside function body
3. Use `const` for all arrow function declarations

### When importing:

1. Check layer hierarchy first
2. Always use Public API imports
3. Use namespaces for cross-context imports
4. Never import directly from segment files
5. Group imports: external libs → internal contexts → types

**Import order example:**

```typescript
import clsx from 'clsx'
import { useState } from 'react'

import { SharedUi, type SharedTypes } from '@shared'
import { Constants } from '@units/case/lib'
import type { ItemCardLg } from '@units/case/types'
```

### When naming:

1. Files/folders: kebab-case
2. Components/types: PascalCase
3. Functions/variables: camelCase
4. Booleans: question format
5. Constants: PascalCase for exported, UPPER_SNAKE_CASE for module-level primitives

### When working with variants:

Use type-safe variant system with utility types:

```typescript
import { Utils } from '@shared/lib'
import type { Ui } from '@shared/types'

type Color = 'primary' | 'secondary' | 'none'
type Size = 'sm' | 'md' | 'none'

type Variant = Ui.UiVariant<[['color', Color], ['size', Size]]>
type SplittedVariant = [Color, Size | undefined]

type Props = {
  variant?: Variant // 'color:primary size:md'
}

export const Component = (props: Props) => {
  const { variant = 'color:none' } = props
  const [color, size = 'none'] = Utils.splitVariant(variant) as SplittedVariant
}
```

### Code organization:

1. Follow segment hierarchy within contexts
2. Keep one logical unit per file
3. Use index.ts files for controlled exports
4. Maintain strict layer boundaries
5. Co-locate related files (component + nested components + types in same directory when tightly coupled)

## Widget-Specific Patterns

Widgets are complex, reusable page sections that combine multiple units:

- **Naming:** `[widget-name].widget.tsx` (e.g., `page-layout.widget.tsx`)
- **Structure:** Can have internal `ui/` folder for widget-specific subcomponents
- **Exports:** Export main widget component directly, nested components through `ui/index.ts`

**Example:**

```
widgets/
  page-layout/
    page-layout.widget.tsx     # Main widget
    index.ts                   # export { PageLayout } from './page-layout.widget'
    ui/
      footer/
        page-layout-footer.component.tsx
        index.ts               # export { PageLayoutFooter as Footer }
      index.ts                 # export { Footer } from './footer'
```

## App Layer Patterns

### Route Components

- **Location:** `app/routes/[route-name].tsx` or `app/routes/[route-name]/route.tsx`
- **Naming:** Use `default export` for route components
- **Function name:** Descriptive PascalCase with `Page` suffix

**Example:**

```typescript
// app/routes/_landing._index/route.tsx
export default function LandingIndexPage() {
  return <>{/* ... */}</>
}
```

### Page-Specific UI Components

For complex routes, create `ui/` folder alongside route file:

```
app/routes/
  _landing._index/
    route.tsx
    ui/
      banner/
        banner.component.tsx
        index.ts
      index.ts  # export { Banner } from './banner'
```

**Import pattern in route:**

```typescript
import { Banner, CaseCardGrid } from './ui'
```

## Constants Patterns

### String Constants

Use PascalCase for exported constants, especially className collections:

```typescript
// lib/constants/component-classname.constant.ts
import clsx from 'clsx'

export const ComponentBaseClassName = 'rounded-xl bg-white p-4'

export const ComponentVariantClassName = clsx('group transition-colors', 'hover:bg-gray-100')
```

### Primitive Constants

Use UPPER_SNAKE_CASE for module-level primitive values:

```typescript
// lib/constants/env.constant.ts
export const DOMAIN_EN = (import.meta.env.VITE_DOMAIN_EN ?? '') as string
export const DOMAIN_RU = (import.meta.env.VITE_DOMAIN_RU ?? '') as string
```

### Re-exporting

```typescript
// lib/constants/index.ts
export {
  ComponentBaseClassName as BaseClassName,
  ComponentVariantClassName as VariantClassName,
} from './component-classname.constant'

// lib/index.ts
export * as Constants from './constants'
```

## Data Modeling Patterns

### Local Data Types

For component-specific data that doesn't need reuse:

```typescript
// Define type inline or at bottom of component file
type NavLinkBlockItem = {
  title: string
  list: SharedTypes.Ui.NavLinkItem[]
}

const NavLinkBlockList: NavLinkBlockItem[] = [
  {
    title: 'Solutions',
    list: [
      /* ... */
    ],
  },
]
```

### Shared Data Types

For domain entities used across contexts:

```typescript
// units/case/types/case-item.type.ts
import type { SharedUi } from '@shared'

export type CaseItem = {
  id: number
  title: string
  imageSrcName: SharedUi.ImageSourceName
}

// Support discriminated unions for variants
export type CaseItemCardLg = CaseItemCardBase & { cardSize: 'lg' }
export type CaseItemCardSm = CaseItemCardBase & { cardSize: 'sm'; imagePosition: 'left' | 'right' }
export type CaseItemCard = CaseItemCardLg | CaseItemCardSm
```

## Project-Specific Notes

- **Framework:** React Router v7 (file-based routing)
- **Styling:** Tailwind CSS v4 with custom utilities
- **Build:** Vite
- **Icons:** Lazy-loaded SVG with `vite-plugin-svgr`
- **Images:** Centralized mapping in `shared/ui/image/image.component.tsx`

**Remember**: The architecture is designed to scale. Always prioritize maintainability over convenience.
