import mongoose from "mongoose"

const generateCode = (digitCount) => {
    let code = ''

    const generateDigit = () => {
        let digit = Math.floor(Math.random() * 10)
        return digit.toString()
    }    

    for (let index = 0; index < digitCount; index++) {
        code = code + generateDigit()
    }

    return code
}

const dateFixed = () => {
    let dateNow = new Date()
    let hourDelay = 2
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
        Code: {
            type: Number,
            default: generateCode(5)
        },
        expireCode: {
            type: Date,
            default: dateFixed()
        }
    },
})