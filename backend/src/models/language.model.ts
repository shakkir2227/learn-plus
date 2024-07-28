import mongoose, { Schema, Document} from "mongoose";

export interface ILanguage extends Document {
    name: string,
}

const languageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

export const Language = mongoose.model<ILanguage>("Language", languageSchema)