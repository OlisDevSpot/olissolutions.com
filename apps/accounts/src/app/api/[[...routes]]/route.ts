import { auth } from '@olis/auth/server'
import app from '@olis/server'
import { handle } from 'hono/vercel'

app.post('/oli', async (c) => {
  const { name, email, password } = await c.req.json()
  const user = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  })

  return c.json(user)
})

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
