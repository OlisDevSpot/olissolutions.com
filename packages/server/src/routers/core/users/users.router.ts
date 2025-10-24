import { createRouter } from '@olis/server/lib/create-app'
import * as handlers from './handlers'

const usersRouter = createRouter()
  .get('/', ...handlers.findAll)
  .get('/:id', ...handlers.findOne)
  .delete('/:id', ...handlers.deleteOne)

export default usersRouter
export type UsersRouter = typeof usersRouter
