import { Course } from "../models/course.model";
import { Language } from "../models/language.model";
import { Lesson } from "../models/lesson.model";
import { Subject } from "../models/subject.model";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
// import { uploadOnCloudinary } from "../utils/cloudinary";



const createCourse = asyncHandler(async (req, res, next) => {
    if (!req.user) return

    const { name, description, subject, language, objectives } = JSON.parse(req.body.basicDetails)
    // TODO: validate form with JOI, trim fields.


    let courseLanguage = await Language.findOne({ name: language })
    // Creating here if not exist.
    if (!courseLanguage) {
        courseLanguage = await Language.create({
            name: language
        })
    }

    // TODO: Findout subject exist. check it's block status
    let courseSubject = await Subject.findById(subject)

    if (!courseSubject) {
        // Creating here if not exist.
        courseSubject = await Subject.create({
            name: subject
        })
    }                                        


    // Upload thumbnail to cloudinary.
    let image;
    if (req.files) {
        const filesArr: any | Express.Multer.File[] = req.files;
        if (Array.isArray(filesArr)) {
            const thumbnailFile = filesArr.find((file) => (file.fieldname === "thumbnail"));
            if (thumbnailFile) {
                image = await uploadOnCloudinary(thumbnailFile.path) as { url: string };
            }
        }
    }

    const course = await Course.create({
        name,
        instructor: req.user._id,
        description,
        subject: courseSubject._id,
        language: courseLanguage._id,
        thumbnail: image?.url,
        objectives
    })

    // If lessons are also included ?? then
    // Getting name, content, course, order_index
    if (req.body.lessons) {
        const lessons = req.body.lessons
        for (let i = 0; i < lessons.length; i++) {

            let content
            if (req.files) {
                const filesArr: any | Express.Multer.File[] = req.files;
                if (Array.isArray(filesArr)) {
                    const lessonFile = filesArr.find((file) => (file.fieldname === `lessons[${i}][content]`));
                    if (lessonFile) {
                        content = await uploadOnCloudinary(lessonFile.path) as { url: string };
                    }
                }
            }
            await Lesson.create({
                name: lessons[i]?.title,
                course: course?._id,
                content: content?.url,
                order_index: i + 1
            })
        }
    }


    return res.json(new ApiResponse(201, { course }, ""))

})



export {
    createCourse,
}