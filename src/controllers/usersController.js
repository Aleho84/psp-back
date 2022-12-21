import logger from '../utils/logger.js'
import { usersDao } from '../daos/index.js'

export const login = (req, res) => {
  try {
    res.status(200).json({
      message: `User ${req.user.email} successfully logged in.`,
      id: req.user._id,
      email: req.user.email,
      token: req.user.token
    })
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const loginError = (req, res) => {
  try {
    const msg = req.session.messages
    req.session.messages = null
    res.status(401).json({ message: msg[0] })
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const signin = (req, res) => {
  try {
    res.status(201).json({
      message: 'Registered user successfully',
      id: req.user._id,
      email: req.user.email,
      token: req.user.token
    })
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }

}

export const signinError = (req, res) => {
  try {
    const msg = req.session.messages
    req.session.messages = null
    res.status(400).json({ message: msg[0] })
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const logout = (req, res) => {
  try {
    const ip = req.socket.remoteAddress
    let msg = null

    if (!req.user) {
      msg = `Can not closed anonymous session`
      logger.info(`[USERS][${ip}]: ${msg}`)
      res.status(400).json({ message: msg })
      return
    }

    req.session.destroy((err) => {
      if (err) {
        msg = 'Failed to log out'
        logger.warn(`[USERS][${ip}]: ${msg}`)
        return res.status(500).json({ message: msg })
      }
      msg = `Closed session ${req.user.email}`
      logger.info(`[USERS][${ip}]: ${msg}`)
      res.status(200).json({ message: msg })
    })
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const currentUser = (req, res) => {
  try {
    const ip = req.socket.remoteAddress
    let msg = null

    if (req.user) {
      const { name, lastname, image, email } = req.user
      msg = `Get current user ${email}`
      logger.info(`[USERS][${ip}]: ${msg}`)
      res.status(200).json({ name, lastname, email, image })
    } else {
      msg = `Get current user 'Anonymous'`
      logger.info(`[USERS][${ip}]: ${msg}`)
      res.status(200).json({ name: 'Anonymous' })
    }
  } catch (err) {    
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const ip = req.socket.remoteAddress
    let msg = null

    const userDeleted = await usersDao.delete(req.params.id)
    if (userDeleted) {
      msg = 'User deleted successfully'
      logger.info(`[USERS][${ip}]: ${msg}`)
      res.status(200).json({
        message: msg,
        user: userDeleted
      })
    } else {
      res.status(404).json({ message: `User not found. ID:${req.params.id}` })
    }
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const ip = req.socket.remoteAddress
    let msg = null

    const allUsers = await usersDao.getAll()
    if (allUsers) {
      msg = 'All users fetched successfully'
      logger.info(`[USERS][${ip}]: ${msg}`)
      res.status(200).json(allUsers)
    } else {
      res.status(404).json({ message: `User not found. ID:${req.params.id}` })
    }
  } catch (err) {
    logger.error(`[USERS][${ip}]: ${err}`)
    res.status(500).json({ message: err.message })
  }
}