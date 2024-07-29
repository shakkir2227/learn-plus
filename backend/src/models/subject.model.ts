import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
    name: string,
    isBlocked: boolean
}

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        set: (v: string) => v.toLowerCase()
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Subject = mongoose.model<ISubject>("Subject", subjectSchema)