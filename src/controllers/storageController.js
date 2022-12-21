import fs from 'fs'
import logger from '../utils/logger.js'
import { uploadImageFileMulter } from '../utils/multer.js'

import {
    MULTER_PATH,
    MULTER_URL
} from '../config/constant.js'

export const imageUpload = async (req, res) => {
    try {
        await uploadImageFileMulter(req, res)

        if (req.file == undefined) {
            return res.status(400).json({ message: 'Please upload a file!' })
        }

        res.status(200).send({ message: `Uploaded the file successfully: ${req.file.originalname}` })
    } catch (err) {
        if (err.code == 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size cannot be larger than 2MB!' })
        } else {
            res.status(500).json({ message: err })
        }
    }
}

export const imageFiles = (req, res) => {
    fs.readdir(MULTER_PATH, function (err, files) {
        if (err) {
            res.status(500).json({ message: 'Unable to list files!' })
        }

        let fileInfos = []

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: `${req.protocol}://${req.headers.host}${MULTER_URL}/${file}`
            })
        })

        res.status(200).json({ files: fileInfos })
    })
}

export const imageDownload = (req, res) => {
    const fileName = req.params.name

    res.download(`${MULTER_PATH}/${fileName}`, fileName, (err) => {

        if (err) {
            if (err.code == 'ENOENT') {
                res.status(400).json({ message: 'File not found.' })
            } else {
                res.status(500).json({ message: 'Could not download the file. ' + err })
            }
        }
    })
}

export const imageRemove = (req, res) => {
    const fileName = req.params.name
    const filePath = `${MULTER_PATH}/${fileName}`
    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code == 'ENOENT') {
                res.status(400).json({ message: 'The file does not exists' })
            } else {
                res.status(500).json({ message: 'Could not delete the file' + err })
            }
        } else {
            res.status(200).json({ message: 'File is deleted.' })
        }
    })
}