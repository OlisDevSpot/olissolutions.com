import { createRouter } from '@workspace/hono/lib/create-app'

const indexRoute = createRouter()
  .get('/', (c) => {
    return c.json('Hello from Users API!')
  })
  .get('/stream', async (c) => {
    // Generate a large response
    let largeData = ''
    for (let i = 0; i < 10000; i++) {
      largeData += `This is line ${i} with some data that makes it longer\n`
    }

    return c.json({ message: largeData })
  })

export default indexRoute
