import { Router } from 'express'
import { auth } from '../config/jsonwebtoken.js'

const userRouter = Router()

import {
    getLogs
} from '../controllers/logsController.js'

userRouter.get('/', auth, getLogs)

export default userRouter