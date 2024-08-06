import { Course } from "../models/course.model";
import { Language } from "../models/language.model";
import { Lesson } from "../models/lesson.model";
import { Subject } from "../models/subject.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import mongoose, { Types } from "mongoose";

type Lesson = {
    title: string
}


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

    let courseSubject = await Subject.findOne({ name: subject })

    if (courseSubject && courseSubject.isBlocked) return next(new ApiError(
        400, "The selected subject is blocked. Please choose another one."
    ))

    // TODO: check a course exist with name, subject and language same for this user
    const existingCourse = await Course.findOne({ name, subject: courseSubject?._id, language: courseLanguage?._id, instructor: req.user._id })
    if (existingCourse) return next(new ApiError(400,
        `A course with the name ${existingCourse.name}, language ${courseLanguage.name},
         and subject ${courseSubject?.name}' already exists.`
    ))

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
        subject: courseSubject?._id,
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


    return res.json(new ApiResponse(201, { course }, "Course Created Successfully!"))

})

const updateCourse = asyncHandler(async (req, res, next) => {
    if (!req.user) return
    const { courseId } = req.params
    if (!courseId) return

    const { name, description, subject, language, objectives } = JSON.parse(req.body.basicDetails)
    // TODO: validate form with JOI, trim fields.

    let courseLanguage = await Language.findOne({ name: language })
    // Creating here if not exist.
    if (!courseLanguage) {
        courseLanguage = await Language.create({
            name: language
        })
    }

    let courseSubject = await Subject.findOne({ name: subject })

    if (courseSubject && courseSubject.isBlocked) return next(new ApiError(
        400, "The selected subject is blocked. Please choose another one."
    ))

    // TODO: check another course exist with name, subject and language same for this user
    const existingCourse = await Course.aggregate([
        {
            $match: {
                _id: {
                    $ne: new mongoose.Types.ObjectId(courseId),
                },
                name,
                subject: courseSubject?._id,
                language: courseLanguage?._id,
                instructor: req.user._id
            }
        }
    ])

    if (existingCourse?.length) return next(new ApiError(400,
        `A course with the name ${existingCourse[0].name}, language ${courseLanguage.name},
         and subject ${courseSubject?.name}' already exists.`
    ))

    const courseDetails = await Course.findOne({ _id: courseId })
    if (!courseDetails) return

    courseDetails.name = name
    courseDetails.description = description
    courseDetails.subject = courseSubject?._id as Types.ObjectId
    courseDetails.language = courseLanguage._id as Types.ObjectId
    courseDetails.objectives = objectives

    if (req.files) {
        const filesArr: any | Express.Multer.File[] = req.files;
        if (Array.isArray(filesArr)) {
            const thumbnailFile = filesArr.find((file) => (file.fieldname === "thumbnail"));
            if (thumbnailFile) {
                const image = await uploadOnCloudinary(thumbnailFile.path) as { url: string };
                courseDetails.thumbnail = image.url
            }
        }
    }

    await courseDetails.save()

    const existingLessons = await Lesson.aggregate([
        {
            $match: {
                course: new mongoose.Types.ObjectId(courseId)
            }
        }
    ])

    if (existingLessons?.length) {
        const inputLessons: Lesson[] = req.body.lessons

        for (let i = 0; i < existingLessons.length; i++) {
            if (!inputLessons) {
                await Lesson.deleteOne({ order_index: i + 1, course: new mongoose.Types.ObjectId(courseId) })
                continue
            }

            const inputLesson = inputLessons[i]

            // If no lesson, user removed it. so remove from course
            if (!inputLesson) {
                await Lesson.deleteOne({ order_index: i + 1, course: new mongoose.Types.ObjectId(courseId) })
            } else {
                const lesson = await Lesson.findOne({ order_index: i + 1, course: new mongoose.Types.ObjectId(courseId) })
                if (!lesson) return
                lesson.name = inputLesson.title

                if (req.files) {
                    const filesArr: any | Express.Multer.File[] = req.files;
                    if (Array.isArray(filesArr)) {
                        const lessonFile = filesArr.find((file) => (file.fieldname === `lessons[${i}][content]`));
                        if (lessonFile) {
                            const uploadedFile = await uploadOnCloudinary(lessonFile.path) as { url: string };
                            lesson.content = uploadedFile.url
                        }
                    }
                }

                await lesson.save()
            }
        }
    }

    // If inputlesson stil exists after removing existing lessons, create
    // new lessons.
    const inputLessons: Lesson[] = req.body.lessons
    if (inputLessons && inputLessons.length > existingLessons.length) {

        for (let i = 0; i < inputLessons.length - existingLessons.length; i++) {
            let content

            if (req.files) {
                const filesArr: any | Express.Multer.File[] = req.files;
                if (Array.isArray(filesArr)) {
                    const lessonFile = filesArr.find((file) => (file.fieldname === `lessons[${existingLessons.length + i}][content]`));
                    if (lessonFile) {
                        content = await uploadOnCloudinary(lessonFile.path) as { url: string };
                    }
                }
            }

            await Lesson.create({
                name: inputLessons[existingLessons.length + i]?.title,
                course: courseDetails?._id,
                content: content?.url,
                order_index: existingLessons.length + i + 1
            })
        }
    }

    return res.json(new ApiResponse(200, {}, "Your course has been updated successfully. All changes have been saved."))

})

const createSubject = asyncHandler(async (req, res, next) => {
    const { subject } = req.body as { subject: string }
    if (!subject) return next(new ApiError(400, "Name must be 3 - 100 letters long."))

    const pattern = /^[A-Za-z]{3,100}$/
    if (!pattern.test(req.body?.subject?.trim())) {
        return next(new ApiError(400, "Name must be 3 - 100 letters long."))
    }

    const existingSubject = await Subject.findOne({ name: subject })
    if (existingSubject) return next(new ApiError(400, "This subject already exists in the system."))

    const subjectCreated = await Subject.create({ name: subject })

    const { _id, name, isBlocked } = subjectCreated

    return res.json(new ApiResponse(201, { subject: { _id, name, isBlocked } }, "Subject created successfully!"))

})

const getAllSubjectsForInstructor = asyncHandler(async (req, res, next) => {

    const allSubjects = await Subject.aggregate([
        {
            $match: {
                isBlocked: false
            },

        },
        {
            $project: {
                name: 1
            }
        }
    ])

    return res.json(new ApiResponse(200, { allSubjects }))
})

const getAllCoursesForLearner = asyncHandler(async (req, res, next) => {

    const allCourses = await Course.aggregate([
        {
            $match: {
                isBlocked: false // TODO: When block the subject, block the courses corresponding.
            }
        },
        {
            $lookup: {
                from: "instructors",
                localField: "instructor",
                foreignField: "_id",
                as: "instructor"
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "language",
                foreignField: "_id",
                as: "language"
            }
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject",
                foreignField: "_id",
                as: "subject"
            }
        },
        {
            $unwind: "$instructor"
        },
        {
            $unwind: "$language"
        },
        {
            $unwind: "$subject"
        },
        {
            $addFields: {
                instructorName: "$instructor.name",
                courseSubject: {
                    _id: "$subject._id",
                    name: "$subject.name",
                },
                courseLanguage: {
                    _id: "$language._id",
                    name: "$language.name",
                },
            },

        },
        {
            $project: {
                name: 1,
                instructorName: 1,
                courseSubject: 1,
                courseLanguage: 1,
            }
        }
    ])

    const allSubjects = await Subject.aggregate([
        {
            $match: {
                isBlocked: false
            },

        },
        {
            $project: {
                name: 1
            }
        }
    ])

    const allLanguages = await Language.aggregate([
        {
            $project: {
                name: 1
            }
        }
    ])

    return res.json(new ApiResponse(200, { allCourses, allSubjects, allLanguages }))
})

const getAllCoursesForInstructor = asyncHandler(async (req, res, next) => {
    if (!req.user) return

    const allCourses = await Course.aggregate([
        {
            $match: {
                instructor: new Types.ObjectId(req.user._id),
                isBlocked: false
            }
        },
        {
            $lookup: {
                from: "instructors",
                localField: "instructor",
                foreignField: "_id",
                as: "instructor"
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "language",
                foreignField: "_id",
                as: "language"
            }
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject",
                foreignField: "_id",
                as: "subject"
            }
        },
        {
            $unwind: "$instructor"
        },
        {
            $unwind: "$language"
        },
        {
            $unwind: "$subject"
        },
        {
            $addFields: {
                instructorName: "$instructor.name",
                courseSubject: {
                    _id: "$subject._id",
                    name: "$subject.name",
                },
                courseLanguage: {
                    _id: "$language._id",
                    name: "$language.name",
                },
            },

        },
        {
            $project: {
                name: 1,
                instructorName: 1,
                courseSubject: 1,
                courseLanguage: 1,
            }
        }
    ])

    return res.json(new ApiResponse(200, { allCourses }))
})

const getAllCoursesAndSubjectsForAdmin = asyncHandler(async (req, res, next) => {

    const allCourses = await Course.aggregate([
        {
            $lookup: {
                from: "instructors",
                localField: "instructor",
                foreignField: "_id",
                as: "instructor"
            }
        },
        {
            $unwind: "$instructor"
        },
        {
            $addFields: {
                instructorName: "$instructor.name",
            },

        },
        {
            $project: {
                name: 1,
                instructorName: 1,
                isBlocked: 1,
            }
        }
    ])

    const allSubjects = await Subject.aggregate([
        {
            $project: {
                name: 1,
                isBlocked: 1
            }
        }
    ])

    return res.json(new ApiResponse(200, { allCourses, allSubjects }))
})

const getCourseDetails = asyncHandler(async (req, res, next) => {

    const { courseId } = req.params

    const courseDetails = await Course.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(courseId)
            }
        },
        {
            $lookup: {
                from: "instructors",
                localField: "instructor",
                foreignField: "_id",
                as: "instructor"
            }
        },
        {
            $lookup: {
                from: "languages",
                localField: "language",
                foreignField: "_id",
                as: "language"
            }
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject",
                foreignField: "_id",
                as: "subject"
            }
        },
        {
            $unwind: "$instructor"
        },
        {
            $unwind: "$language"
        },
        {
            $unwind: "$subject"
        },
        {
            $addFields: {
                courseInstructor: {
                    _id: "$instructor._id",
                    name: "$instructor.name"
                },
                courseSubject: {
                    name: "$subject.name",
                },
                courseLanguage: {
                    name: "$language.name",
                },
            },

        },
        {
            $project: {
                name: 1,
                instructorName: 1,
                courseSubject: 1,
                courseLanguage: 1,
                courseInstructor: 1,
                description: 1,
                thumbnail: 1,
                objectives: 1,
                isBlocked: 1

            }
        }
    ])
    if (!courseDetails[0]) return next(new ApiError(404, "We couldn't find a course with that ID. Please double-check the ID you entered and try again."))
    if (courseDetails[0].isBlocked) return next(new ApiError(404, "This course is currently unavailable. It may be blocked due to administrative reasons."))

    const lessons = await Lesson.aggregate([
        {
            $match: {
                course: new Types.ObjectId(courseId)
            }
        },
        {
            $sort: {
                order_index: 1
            }
        },
        {
            $project: {
                name: 1,
                content: 1,
                order_index: 1
            }
        }
    ])

    return res.json(new ApiResponse(200, { courseDetails: courseDetails[0], lessons }))

})

const blockOrUnblockCourse = asyncHandler(async (req, res, next) => {
    const { courseId } = req.body
    if (!courseId) return

    const course = await Course.findOne({ _id: courseId }, { isBlocked: 1 })
    if (!course) return

    course.isBlocked = !course.isBlocked
    await course.save()

    return res.json(new ApiResponse(200, { course }))

})

export {
    createCourse,
    updateCourse,
    createSubject,
    getAllSubjectsForInstructor,
    getAllCoursesForLearner,
    getAllCoursesForInstructor,
    getAllCoursesAndSubjectsForAdmin,
    getCourseDetails,
    blockOrUnblockCourse
}