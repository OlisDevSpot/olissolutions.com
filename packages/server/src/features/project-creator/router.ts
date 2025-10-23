import { createRouter } from '@olis/server/lib/create-app'
import { authMiddleware } from '@olis/server/middlewares/auth.middleware'
import * as handlers from './handlers'

export const projectsRouter = createRouter()
  .use(authMiddleware)
  .get('/', ...handlers.findAll)
  .post('/', ...handlers.createOne)
  .post('/init', ...handlers.initProject)
  .get('/:id', ...handlers.findOne)
  .patch('/:id', ...handlers.updateOne)
  .delete('/:id', ...handlers.deleteOne)
  .get('/:id/customers', ...handlers.findAllProjectCustomers)
  .get('/:id/solutions', ...handlers.findAllProjectSolutions)
  .get('/:id/jobsite', ...handlers.findProjectJobsite)
  .get('/:id/financial-profile', ...handlers.findProjectFinancialProfile)
  .post('/:id/solutions', ...handlers.createProjectSolutions)
  .patch('/:id/jobsite', ...handlers.updateProjectJobsite)
  .patch('/:id/financial-profile', ...handlers.updateProjectFinancialProfile)
  .patch('/:id/solutions/:solutionId', ...handlers.updateProjectSolution)

export default projectsRouter
