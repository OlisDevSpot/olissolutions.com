import { auth } from '@olis/auth/server'

import { factory } from '@olis/server/lib/create-app'

import { signInEmailValidator, signUpEmailValidator } from './validators'

export const signUp = factory.createHandlers(signUpEmailValidator, async (c) => {
  const { email, password, name } = c.req.valid('json')
  const response = await auth.api.signUpEmail({ body: { email, password, name }, returnHeaders: true })
  // No cookie in header on sign up as verification needed
  return c.json(response)
})

export const signIn = factory.createHandlers(signInEmailValidator, async (c) => {
  const { email, password } = c.req.valid('json')
  const response = await auth.api.signInEmail({ body: { email, password }, returnHeaders: true })
  c.header('set-cookie', response.headers.get('set-cookie')!)

  return c.json(response)
})

export const signOut = factory.createHandlers(async (c) => {
  const response = await auth.api.signOut({ headers: c.req.raw.headers })
  return c.json(response)
})
