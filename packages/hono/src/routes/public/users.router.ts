import { createRouter } from '@workspace/hono/lib/create-app'
import * as handlers from '@workspace/core/entities/users/server/handlers'

const usersRouter = createRouter()
  .get('/', ...handlers.findAll)
  .get('/:id', ...handlers.findOne)
  .delete('/:id', ...handlers.deleteOne)

export default usersRouter
export type UsersRouter = typeof usersRouter
