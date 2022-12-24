import mongoose from "mongoose"
import { generateCode } from '../utils/nodemailer.js'

const dateCodeExpire = () => {
    let dateNow = new Date()
    let hourDelay = 24
    let hourDelayMiliseconds = 1000 * 60 * 60 * hourDelay

    let dateNew = new Date(dateNow.getTime() + hourDelayMiliseconds)
    return dateNew
}

export const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    account: {
        confirmed: {
            type: Boolean,
            default: false
        },
        code: {
            type: Number,
            default: generateCode(5)
        },
        expireCode: {
            type: Date,
            default: dateCodeExpire()
        }
    }
})