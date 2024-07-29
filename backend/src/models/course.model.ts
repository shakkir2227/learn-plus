import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICourse extends Document {
    name: string,
    instructor: mongoose.Types.ObjectId,
    description: string,
    subject: mongoose.Types.ObjectId,
    language: mongoose.Types.ObjectId
    thumbnail: string,
    objectives: Array<string>,
    isBlocked: boolean,
    createdAt: string,
    updatedAt: string
}

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: Types.ObjectId,
        required: true,
    },
    language: {
        type: Types.ObjectId,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    objectives: {
        type: Array,
        required: true,
        trim: true
    },
    isBlocked: {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

export const Course = mongoose.model<ICourse>("Course", courseSchema)