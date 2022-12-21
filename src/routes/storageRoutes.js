import { Router } from 'express'
import { auth } from '../config/jsonwebtoken.js'

const storageRouter = Router()

import {
    imageUpload,
    imageFiles,
    imageDownload,
    imageRemove
} from '../controllers/storageController.js'

storageRouter.post('/imageUpload', auth, imageUpload)
storageRouter.get('/imageFiles', auth, imageFiles)
storageRouter.get('/imageFiles/:name', auth, imageDownload)
storageRouter.delete('/imageFiles/:name', auth, imageRemove)

export default storageRouter