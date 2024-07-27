import React from 'react'
import Header from '../../components/instructor/Header'
import Logo from '../../components/shared/Logo'
import { Link } from 'react-router-dom'
import { PiChatCircleDots } from 'react-icons/pi'
import { FaRegUserCircle } from 'react-icons/fa'
import { INSTRUCTOR_ROUTE_PATHS } from '../../constants'
import DashBoardHeader from '../../components/instructor/DashBoardHeader'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { MdKeyboardArrowDown } from "react-icons/md";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import CourseCard from '../../components/learner/CourseCard'
import Footer from '../../components/learner/Footer'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/ui/select'
import { PlusCircledIcon } from "@radix-ui/react-icons"

const CoursesList = () => {
    return (
        <>
            <div className='h-full sm:block hidden'>
                <Header logoTheme='WHITE' iconColor='black' />

                <div className='mt-3 border-b-2 border-gray-200' > </div>
                <div className='w-11/12 mx-auto'>
                    <div className='flex justify-between mt-10'>
                        <div className='mb-10'>
                            <p className='sm:text-2xl   font-serif  text-center sm:text-start  ml-3'>Manage your courses
                                <br />
                                <span className='text-muted-foreground text-sm'> Organize and track your courses with ease.</span>
                            </p>
                            <div className="flex w-72 max-w-sm items-center space-x-2 ml-2 mt-5 ">
                                <Input type="text" placeholder="Course name" />
                                <Button type="submit">Search</Button>
                            </div>
                        </div>
                        <div className="mr-10">
                            <Button >
                                <PlusCircledIcon className="mr-2 h-4 w-4" />
                                Add course
                            </Button>
                        </div>
                    </div>
                    <div className='  '>
                        <div className='flex '>
                            <div></div>
                        </div>
                        <div className="grid grid-cols-3 gap-10 mr-10   ">
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
            </div>

            <div className=' min-h-[3480px]  sm:hidden '>
                <DashBoardHeader logoTheme='WHITE' iconColor='black' />
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
            </div>

        </>
    )
}

export default CoursesList
