import fs from 'fs'
import logger from '../utils/logger.js'
import { uploadImageFileMulter } from '../utils/multer.js'

import {
    MULTER_PATH,
    MULTER_URL
} from '../config/constant.js'

export const imageUpload = async (req, res) => {
    const ip = req.socket.remoteAddress
    let msg = null

    try {
        await uploadImageFileMulter(req, res)

        if (req.file == undefined) {
            msg = 'Please upload a image'
            logger.warn(`[STORAGE][${ip}]: ${msg}`)
            return res.status(400).json({ message: msg })
        }

        msg = `Uploaded the image successfully: ${req.file.originalname}`
        logger.info(`[STORAGE][${ip}]: ${msg}`)
        res.status(200).send({ message: msg })
    } catch (err) {
        if (err.code == 'LIMIT_FILE_SIZE') {
            msg = 'Image size cannot be larger than 2Mb'
            logger.warn(`[STORAGE][${ip}]: ${msg}`)
            return res.status(400).json({ message: msg })
        } else {
            logger.error(`[STORAGE][${ip}]: ${err}`)
            res.status(500).json({ message: err })
        }
    }
}

export const imageFiles = (req, res) => {
    fs.readdir(MULTER_PATH, function (err, files) {
        const ip = req.socket.remoteAddress
        let msg = null

        if (err) {
            msg = 'Error when trying to list images'
            logger.error(`[STORAGE][${ip}]: ${msg}`)
            res.status(500).json({ message: msg })
        }

        let fileInfos = []

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: `${req.protocol}://${req.headers.host}${MULTER_URL}/${file}`
            })
        })

        msg = 'Image list fetched successfully'
        logger.info(`[STORAGE][${ip}]: ${msg}`)
        res.status(200).json({ files: fileInfos })
    })
}

export const imageDownload = (req, res) => {
    const fileName = req.params.name
    const ip = req.socket.remoteAddress
    let msg = null

    res.download(`${MULTER_PATH}/${fileName}`, fileName, (err) => {

        if (err) {
            if (err.code == 'ENOENT') {
                msg = `Image not found: ${fileName}`
                logger.warn(`[STORAGE][${ip}]: ${msg}`)
                res.status(400).json({ message: msg })
            } else {
                msg = `Could not download the image. ${err}`
                logger.error(`[STORAGE][${ip}]: ${msg}`)
                res.status(500).json({ message: msg })
            }
        } else {
            msg = `Image download successfully: ${fileName}`
            logger.info(`[STORAGE][${ip}]: ${msg}`)
        }
    })
}

export const imageRemove = (req, res) => {
    const fileName = req.params.name
    const filePath = `${MULTER_PATH}/${fileName}`
    const ip = req.socket.remoteAddress
    let msg = null

    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code == 'ENOENT') {
                msg = 'The image does not exists'
                logger.warn(`[STORAGE][${ip}]: ${msg}`)
                res.status(400).json({ message: msg })
            } else {
                msg = `Could not delete the image. ${err}`
                logger.error(`[STORAGE][${ip}]: ${msg}`)
                res.status(500).json({ message: msg })
            }
        } else {
            msg = 'Image successfully deleted'
            logger.info(`[STORAGE][${ip}]: ${msg}`)
            res.status(200).json({ message: msg })
        }
    })
}