import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    coursesEnrolled: {
        type: Array,
        default: []
    },
    lastSubscription: {
        type: mongoose.Schema.ObjectId,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)