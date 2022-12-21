import { Router } from 'express'
import usersRouter from './usersRoutes.js'
import storageRouter from './storageRoutes.js'

const apiRouter = Router()

apiRouter.use('/users', usersRouter)
apiRouter.use('/storage', storageRouter)

export default apiRouter