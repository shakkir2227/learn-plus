import React, { useEffect, useRef, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { Switch } from '../../components/ui/switch'
import { Label } from '../../components/ui/label'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../components/ui/alert-dialog"
import { FaLess } from 'react-icons/fa'
import { getAllUsers, userUpdateService } from '../../services/admin/UserService'
import toast, { Toaster } from 'react-hot-toast'
import ErrorToastDark from '../../components/shared/ErrorToastDark'
import { loadCourses, loadInstructors, loadLearners, loadSubjects, updateCourse, updateInstructors, updateLearners } from '../../store/AdminSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Footer from '../../components/learner/Footer'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { Input } from '../../components/ui/input'
import { courseBlockUnblockService, createSubjectService, getAllCoursesAndSubjectsService, getAllCoursesService } from '../../services/admin/CourseService'
import ToastError from '../../components/shared/ToastError'
import ToastSuccess from '../../components/shared/ToastSuccess'

type Options = "COURSES" | "SUBJECTS"

const CoursesList = () => {
    const dispatch = useAppDispatch()
    const [options, setOptions] = useState<Options>("COURSES") // For select
    const [subject, setSubject] = useState<string>("")
    const [subjectInputError, setSubjectInputError] = useState<string>("")
    const allCourses = useAppSelector((state) => (state.admin.allCourses))
    const allSubjects = useAppSelector((state) => (state.admin.allSubjects))


    const handleOptionsSelect = (value: Options) => {
        setOptions(value)
    }

    const toggleCourseBlocking = async (id: string) => {
        const response = await courseBlockUnblockService(id)
        if (!response.success && response.message) {

        }
        if (response.success && response.data) {
            dispatch(updateCourse(response.data.course))
        }
    }

    useEffect(() => {
        (async () => {
            const response = await getAllCoursesAndSubjectsService()
            if (!response.success && response.message) {
                toast.custom((t) => (
                    <ErrorToastDark message={response.message as string} t={t}></ErrorToastDark>
                ))
                return
            }
            if (response.success) {
                if (response.data) {
                    dispatch(loadCourses(response.data.allCourses))
                    dispatch(loadSubjects(response.data.allSubjects))
                }
            }

        })()
    }, [])

    const addSubject = async () => {
        setSubjectInputError("")

        const pattern = /^[A-Za-z]{3,100}$/
        if (!pattern.test(subject)) {
            setSubjectInputError("Name must be 3 - 100 letters long.")
            return
        }

        const response = await createSubjectService(subject)
        if (!response.success && response.message) {
            toast.custom((t) => (
                <ToastError t={t} message={response.message as string} />
            ), {
                duration: 2000, // Auto dismiss after 2 seconds
            });
        }
        if (response.success && response.message) {
            setSubject("")
            return toast.custom((t) => (
                <ToastSuccess message={response.message as string} t={t} />
            ), {
                duration: 2000, // Auto dismiss after 2 seconds
            })
        }

    }

    return (
        <div>
            <div className='w-10/12 mx-auto flex justify-between' >
                <Select onValueChange={(value: Options) => handleOptionsSelect(value)} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Courses" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup  >
                            <SelectLabel></SelectLabel>
                            <SelectItem value="COURSES">Courses</SelectItem>
                            <SelectItem value="SUBJECTS">Subjects</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger asChild><Button variant={"secondary"}>Add Subject</Button></PopoverTrigger>
                    <PopoverContent className='bg-gray-700'>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right text-white">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={subject}
                                    className="col-span-3"
                                    onChange={(e) => setSubject(e.target?.value)}
                                />
                            </div>
                            <span className='text-red-400 text-xs text-center'>{subjectInputError}</span>
                            <Button onClick={addSubject}>Save changes</Button>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
            <div className='pt-10'>
                {options === "COURSES" ?
                    <Table className='w-9/12 mx-auto'>
                        <TableCaption>A list of courses and subjects.</TableCaption>
                        <TableHeader>
                            <TableRow className='hover:bg-muted/10'>
                                <TableHead className="">No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead className="text-right">Block</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allCourses && allCourses.length &&
                                allCourses.map((course, index) => (
                                    <TableRow key={course._id}>
                                        <TableCell className="font-medium text-white">{index + 1}</TableCell>
                                        <TableCell className='text-white' >{course.name}</TableCell>
                                        <TableCell className='text-white'>{course.instructorName}</TableCell>
                                        <TableCell className="text-right">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <div>
                                                        <Switch checked={course.isBlocked} className='data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-600' id="airplane-mode" />
                                                    </div>
                                                </AlertDialogTrigger>
                                                {!course.isBlocked ?
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to block this course?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Blocking this course will prevent users from accessing its content and participating in related activities. You can reverse this action by unblocking the course later.                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => toggleCourseBlocking(course._id)} >Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                    :
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to Unblock this user?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Unblocking this course will restore access to its content and allow users to fully participate in related activities again. You can reverse this action by blocking the course if needed.                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => toggleCourseBlocking(course._id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                }
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                    </Table>

                    :
                    <Table className='w-9/12 mx-auto'>
                        <TableCaption>A list of courses and subjects.</TableCaption>
                        <TableHeader>
                            <TableRow className='hover:bg-muted/10'>
                                <TableHead className="">No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead className="text-right">Block</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allCourses && allCourses.length &&
                                allCourses.map((course, index) => (
                                    <TableRow key={course._id}>
                                        <TableCell className="font-medium text-white">{index + 1}</TableCell>
                                        <TableCell className='text-white' >{course.name}</TableCell>
                                        <TableCell className='text-white'>{course.instructorName}</TableCell>
                                        <TableCell className="text-right">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <div>
                                                        <Switch checked={course.isBlocked} className='data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-600' id="airplane-mode" />
                                                    </div>
                                                </AlertDialogTrigger>
                                                {!course.isBlocked ?
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to block this course?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Blocking this course will prevent users from accessing its content and participating in related activities. You can reverse this action by unblocking the course later.                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => toggleCourseBlocking(course._id)} >Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                    :
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to Unblock this user?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Unblocking this course will restore access to its content and allow users to fully participate in related activities again. You can reverse this action by blocking the course if needed.                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => toggleCourseBlocking(course._id)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                }
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>

                                ))}
                        </TableBody>
                    </Table>
                }

            </div>
            <Footer />
            <Toaster />
        </div>
    )
}

export default CoursesList
