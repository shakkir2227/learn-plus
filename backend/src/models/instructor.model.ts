import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface IInstructor extends Document {
    name: string,
    email: string,
    bio: string,
    profilePicture: string,
    password: string,
    role: string,
    refreshToken: string,
    isVerified: boolean,
    isBlocked: boolean,
    createdAt: string,
    updatedAt: string
}

const instructorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "Instructor"
    },
    refreshToken: {
        type: String,
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
}, {
    timestamps: true
})

instructorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const isPasswordCorrect = async (inputPassword: string, password: string): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, password)
}

export const Instructor = mongoose.model<IInstructor>("Instructor", instructorSchema)