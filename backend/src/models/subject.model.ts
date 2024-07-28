import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
    name: string,
}

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

export const Subject = mongoose.model<ISubject>("Subject", subjectSchema)