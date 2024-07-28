import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILesson extends Document {
    name: string,
    course: mongoose.Types.ObjectId,
    content: string,
    order_index: number,
    createdAt: string,
    updatedAt: string
}

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    order_index: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})

export const Lesson = mongoose.model<ILesson>("Lesson", lessonSchema)