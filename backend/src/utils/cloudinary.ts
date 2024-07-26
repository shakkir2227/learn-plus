import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath:string):Promise<unknown> => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload
            (localFilePath, {
                resource_type: "auto"
            })
        fs.unlinkSync(localFilePath)//remove the file after
        // the file uploaded to cloudinary.

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //if uploading got failed also,
        //removing localfile added by multer.
        throw new ApiError(500, "Error")

    }
}
