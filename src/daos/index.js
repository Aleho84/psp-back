import { DB_MODE } from '../config/constant.js'
import logger from '../utils/logger.js'

let usersDao


switch (DB_MODE) {
  case 'mongoDB': //importa el modelo para usar mongodb
    import('./mongoDBUsers.js').then(({ MongoDBUsers }) => { usersDao = new MongoDBUsers() })
    break

  default:
    const errMsg = '[SERVER]: ❌ DB_MODE not defined'
    logger.error(errMsg)
    throw new Error(errMsg)
    break
}

export { usersDao }