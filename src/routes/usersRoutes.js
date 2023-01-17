import { Router } from 'express'
import { verify } from 'jsonwebtoken'
import passport from 'passport'
import { auth } from '../config/jsonwebtoken.js'

const userRouter = Router()

import {
    login,
    loginError,
    signin,
    signinError,
    logout,
    currentUser,
    getUsers,
    deleteUser,
    verifyUser
} from '../controllers/usersController.js'

userRouter.get('/loginError', loginError)
userRouter.get('/signinError', signinError)
userRouter.get('/logout', logout)
userRouter.get('/currentUser', currentUser)
userRouter.get('/getUsers', auth, getUsers)

userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/users/loginError', failureMessage: true }), login)
userRouter.post('/signin', passport.authenticate('signin', { failureRedirect: '/api/users/signinError', failureMessage: true }), signin)
userRouter.post('/verifyUser/:id/:code', verifyUser)

userRouter.delete('/delete/:id', auth, deleteUser)

export default userRouter