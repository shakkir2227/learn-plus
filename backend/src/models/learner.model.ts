import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface ILearner extends Document {
    name: string,
    email: string,
    password: string,
    role: string,
    refreshToken: string,
    coursesEnrolled: string,
    lastSubscription: string,
    isVerified: boolean,
    isBlocked: boolean,
    isAdmin: boolean,
    createdAt: string,
    updatedAt: string
}

const learnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "Learner"
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

learnerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const isPasswordCorrect = async (inputPassword: string, password: string): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, password)
}

export const Learner = mongoose.model<ILearner>("Learner", learnerSchema)