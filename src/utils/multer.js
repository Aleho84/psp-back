import fs from 'fs'
import multer from 'multer'
import path from 'path'
import util from 'util'

import { MULTER_PATH } from '../config/constant.js'

// max file size 2 Mb
const maxSize = 2 * 1024 * 1024

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, MULTER_PATH)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadImageFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb('Only images are allowed')
        }

        const fileExists = fs.existsSync(`${MULTER_PATH}/${file.originalname}`)
        if (fileExists) {
            return cb('The file already exist')
        }

        cb(null, true)
    }
}).single('file')

export const uploadImageFileMulter = util.promisify(uploadImageFile)