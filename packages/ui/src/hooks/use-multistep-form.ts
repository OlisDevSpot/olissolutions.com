import type { Step } from '@olis/ui/types/step'

import type { ZodRawShape } from 'zod'

import { useState } from 'react'

export function useMultistepForm<T extends ZodRawShape>({ steps }: { steps: readonly Step<T>[] }) {
  const [stepIndex, setStepIndex] = useState(0)
  const step = steps[stepIndex]

  if (!step) {
    throw new Error('No step found')
  }

  return {
    stepIndex,
    isFirst: stepIndex === 0,
    isLast: stepIndex === steps.length - 1,
    next: () => setStepIndex(prev => Math.min(prev + 1, steps.length - 1)),
    prev: () => setStepIndex(prev => Math.max(prev - 1, 0)),
    StepForm: step.Component,
    stepId: step.id,
    stepValidation: step.validation,
  }
}
