import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

import { __dirname } from '../../config/constant.js'

export const logCheck = function () {
    const file = path.join(__dirname, '../logs/error.log')

    const read = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' })

    if (read.length > 0 ) {
        return 'fail'
    }
    
    return 'pass'
}
