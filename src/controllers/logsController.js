import logger from '../utils/logger.js'
import path from 'path'
import fs from 'fs'

import {
    __dirname
} from '../config/constant.js'

export const getLogs = (req, res) => {
    const ip = req.socket.remoteAddress
    let msg = null

    try {        
        const file = path.join(__dirname, '../logs/info.log')        
        let jsonLogList = []

        const read = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })

        if (read.length === 0) {
            msg = `Logs fetched successfully`
            logger.info(`[LOGS][${ip}]: ${msg}`)
            res.status(200).json([])
        }

        const arrayLog = read.split(/\r\n|\r|\n/)

        arrayLog.forEach(arrayLogElement => {
            const line = arrayLogElement.split(' - ')
            const jsonLine = {
                timestamp: line[0],
                level: ` ${line[1]}`,
                message: line[2]
            }
            if (!(line[1] == undefined)) {
                jsonLine.level = jsonLine.level.toUpperCase()
                jsonLogList.push(jsonLine)
            }
        })

        msg = `Logs fetched successfully`
        logger.info(`[LOGS][${ip}]: ${msg}`)
        res.status(200).json([jsonLogList])
    } catch (err) {
        logger.error(`[LOGS][${ip}]: ${err}`)
        res.status(500).json({ message: err.message })
    }
}