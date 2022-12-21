import { Router } from 'express'
import usersRouter from './usersRoutes.js'
import storageRouter from './storageRoutes.js'
import logsRouter from './logsRoutes.js'

const apiRouter = Router()

apiRouter.use('/users', usersRouter)
apiRouter.use('/storage', storageRouter)
apiRouter.use('/logs', logsRouter)

export default apiRouter