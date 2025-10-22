import type { JSX } from 'react'
import type { ZodObject, ZodRawShape } from 'zod'

export interface Step<T extends ZodRawShape, K extends keyof ZodObject<T>['shape'] = keyof ZodObject<T>['shape']> {
  id: K
  label: string
  Component: () => JSX.Element
  validation: ZodObject<T>['shape'][K]
}
