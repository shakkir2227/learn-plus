import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const OTPSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Learner" || "Instructor",
        required: true,
    },
    OTP: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

OTPSchema.pre("save", async function (next) {
    this.OTP = await bcrypt.hash(this.OTP, 10);
    next();
})

OTPSchema.methods.isOTPCorrect = async function (OTP: string) {
    return await bcrypt.compare(OTP, this.OTP)
}

export const OTP = mongoose.model("OTP", OTPSchema)