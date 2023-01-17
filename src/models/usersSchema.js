import mongoose from "mongoose"

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
            default: 0
        },
        expireCode: {
            type: Date,
            default: Date.now()
        },
        admin: {
            type: Boolean,
            default: false
        }
    }
})