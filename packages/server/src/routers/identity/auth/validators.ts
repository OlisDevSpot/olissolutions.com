import type { InferInput } from '@olis/server/types'

import { zValidator } from '@hono/zod-validator'

import { loginFormSchema, signupFormSchema } from '@olis/auth/schemas/auth-schemas'

export const signUpEmailValidator = zValidator('json', signupFormSchema, (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export const signInEmailValidator = zValidator('json', loginFormSchema, (result, c) => {
  if (!result.success) {
    return c.json({ errors: result.error.issues.map(issue => ({ path: issue.path[0], message: issue.message })) }, 400)
  }
})

export type SignUpEmailValidator = InferInput<typeof signUpEmailValidator>
export type SignInEmailValidator = InferInput<typeof signInEmailValidator>
