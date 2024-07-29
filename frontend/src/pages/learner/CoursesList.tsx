import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { MdKeyboardArrowDown } from "react-icons/md";
import Footer from '../../components/learner/Footer'
import Header from '../../components/learner/Header'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ToastError from "../../components/shared/ToastError";
import ToastSuccess from "../../components/shared/ToastSuccess";
import { useNavigate } from "react-router";
import { LEARNER_ROUTE_PATHS } from "../../constants";
import { Course, getAllCoursesService, Language } from "../../services/learner/CourseService";
import { Subject } from "../../services/instructor/CourseService";


const CoursesList = () => {

    const [courses, setCourses] = useState<Course[]>()
    const [languages, setLanguages] = useState<Language[]>()
    const [subjects, setSubjects] = useState<Subject[]>()

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const response = await getAllCoursesService()

            if (response.success && response.data) {
                setCourses(response.data.allCourses)
                setLanguages(response.data.allLanguages)
                setSubjects(response.data.allSubjects)
            }

        })()
    }, [])

    return (
        <>
            <div className='h-full sm:block hidden'>
                <Header />
                <div className='mt-3 border-b-2 border-gray-200' > </div>

                <div className='flex'>
                    <div className='w-4/12'>
                        <div className='pt-10 pl-5' >
                            <p className='sm:text-3xl  font-semibold font-serif pt-10 pl-6'>All Courses</p>
                            <p className='pt-10 pl-6 text-xl font-semibold '>Courses to get you started <br /> <span className='text-sm  text-gray-700'>Explore courses from  experts. </span></p>
                            <div className="flex w-72 max-w-sm items-center space-x-2 mt-10 ml-6">
                                <Input type="text" placeholder="Course name" />
                                <Button type="submit">Search</Button>
                            </div>
                            <div className='mt-3 border-b-2 border-gray-200 w-72 ml-6' > </div>
                        </div>

                        <div className='ml-11'>
                            <div className='mt-10 flex w-72 justify-between '>
                                <p className='text-lg font-semibold'>Languages</p>
                                <MdKeyboardArrowDown className='mt-2' />
                            </div>
                            <div className='mt-6 flex flex-col gap-4'>
                                {
                                    languages?.map((language) => {
                                        return <div className="flex gap-3 ">
                                            <MdCheckBoxOutlineBlank size={25} className='mt-1' />
                                            <p>{language.name[0].toUpperCase() + language.name.slice(1).toLowerCase()}</p>
                                        </div>
                                    })
                                }
                            </div>

                            <div className='mt-10 flex w-72 justify-between '>
                                <p className='text-lg font-semibold'>Subjects</p>
                                <MdKeyboardArrowDown className='mt-2' />
                            </div>

                            <div className='mt-6 flex flex-col gap-4'>
                                {
                                    subjects?.map((subject) => {
                                        return <div className="flex gap-3 ">
                                            <MdCheckBoxOutlineBlank size={25} className='mt-1' />
                                            <p>{subject.name[0].toUpperCase() + subject.name.slice(1).toLowerCase()}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className='mt-24 ml-5 w-8/12  '>
                        <div className='flex '>
                            <div></div>
                            <div className='text-xl text-gray-700 py-5 ml-2 mt-10  font-bold'>{courses?.length} result(s)</div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mr-10   ">
                            {courses?.map((course) => {
                                return (<div onClick={() => navigate(`${LEARNER_ROUTE_PATHS.courses}/${course._id}`)} className=" bg-customBg flex flex-col gap-2 md:mx-0 mx-auto md:h-52 rounded-2xl hover:opacity-70 hover:border-2 border-black cursor-pointer">
                                    <p  className="font-semibold p-5 font-serif ">{course.name} <br></br>
                                        <span className="text-xs font-light">{course.instructorName}</span>
                                        <br />
                                        <span className="text-xs font-light">{course.courseSubject.name[0].toUpperCase() + course.courseSubject.name.slice(1).toLocaleLowerCase()} | {course.courseLanguage.name[0].toUpperCase() + course.courseLanguage.name.slice(1).toLocaleLowerCase()}</span>
                                    </p>
                                    <p className="text-xs font-semibold p-5">10,465 students Enrolled </p>
                                </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>

            {/* <div className=' min-h-[3480px]  sm:hidden '>
                <DashBoardHeader />
                <div className='mt-3 border-b-2 border-gray-200' > </div>

                <div className=''>
                    <div className=''>
                        <div className='' >
                            <p className='sm:text-3xl text-xl  font-semibold font-serif pt-10 text-center'>All Courses</p>
                            <p className='pt-10 text-center sm:text-xl font-semibold '>Courses to get you started <br /> <span className='text-sm  text-gray-700'>Explore courses from  experts. </span></p>
                            <div className="flex w-3/4  mt-10 mx-auto space-x-2">
                                <Input type="text" placeholder="Course name" />
                                <Button size={'sm'} type="submit">Search</Button>
                            </div>
                            <div className='my-5 border-b-2 border-gray-200 w-72 ml-6' > </div>
                        </div>

                        <div className='flex flex-col gap-5'>

                            <Select>
                                <SelectTrigger className="w-3/4 mx-auto">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Languages</SelectLabel>
                                        <SelectItem value="apple">All Languages</SelectItem>
                                        <SelectItem value="banana">English</SelectItem>
                                        <SelectItem value="blueberry">Chinese</SelectItem>
                                        <SelectItem value="grapes">Spanish</SelectItem>
                                        <SelectItem value="pineapple">French</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-3/4 mx-auto">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Subjects</SelectLabel>
                                        <SelectItem value="apple">All subjects</SelectItem>
                                        <SelectItem value="banana">Physics</SelectItem>
                                        <SelectItem value="blueberry">Geology</SelectItem>
                                        <SelectItem value="grapes">Economics</SelectItem>
                                        <SelectItem value="pineapple">Geography</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>

                    <div className=''>
                        <div >
                            <p className='text-md text-gray-700 py-5 text-center mt-10  font-bold'>130 results</p>
                        </div>
                        <div className="grid grid-cols-1 gap-10 w-3/4 mx-auto   ">
                            {[1, 2, 3, 4, 5, 6, 7].map((index, value) => {
                                return (<div className=" bg-customBg flex flex-col gap-2 md:mx-0 mx-auto md:h-52 rounded-2xl hover:opacity-70 hover:border-2 border-black cursor-pointer">
                                    <p className="font-semibold p-5 font-serif ">Master The Fundamentals Of Chemistry <br></br>
                                        <span className="text-xs font-light">Rahsoft</span>
                                        <br />
                                        <span className="text-xs font-light">Chemistry | English</span>
                                    </p>
                                    <p className="text-xs font-semibold p-5">10,465 students Enrolled </p>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div> */}

        </>
    )
}

export default CoursesList
