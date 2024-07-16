import React from 'react'
import Header from '../../components/learner/Header'
import { Button } from '../../components/ui/button'
import { FiCheckCircle } from "react-icons/fi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import Footer from '../../components/learner/Footer';
const CourseDetails = () => {
    return (
        <div className='sm:min-h-screen min-h-[2980px]'>
            <div className='bg-customBg' >
                <Header />
                <div className='h-[400px] mt-5 flex sm:flex-row flex-col items-center justify-around '>
                    <div className=' p-5 sm:w-4/12 '>
                        <p className='text-2xl font-bold '>Nuclear Physics</p>
                        <div className='flex gap-5 mt-5'>
                            <p className='text-sm font-semibold mt-2'>Joseph Harari</p>
                            <Button size={'sm'}>Connect</Button>
                        </div>
                        <p className='text-xs mt-5'>Nuclear physics is a branch of physics that
                            deals with the study of the atomic nucleus,
                            which is the central part of an atom
                            that contains protons and neutrons.
                        </p>
                    </div>
                    <div className='w-5/12'>
                        <img className='rounded-lg' src="/course-1.webp" alt="" />
                    </div>
                </div>
            </div >
            <div className='bg-white'>
                <p className='p-10 text-2xl font-serif font-semibold'>What you'll learn</p>
            </div>
            <div className='bg-white sm:pb-16 '>
                <div className='bg-customBg5 sm:w-8/12 mx-10 h-full pb-5 rounded-md flex sm:flex-col'>
                    <div className='ml-5 mt-5 flex gap-4 flex-col'>
                        <div className='flex gap-3'>
                            <FiCheckCircle className='mt-1' />
                            <p className=''>You'll understand the structure of atoms, including protons, neutrons, and electrons.</p>
                        </div>
                        <div className='flex gap-3 '>
                            <FiCheckCircle className='mt-1' />
                            <p className=''>You'll understand the structure of atoms, including protons, neutrons, and electrons.</p>
                        </div>
                        <div className='flex gap-3 '>
                            <FiCheckCircle className='mt-1' />
                            <p className=''>You'll understand the structure of atoms, including protons, neutrons, and electrons.</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className='bg-white sm:p-10 sm:mt-5 mt-10 sm:text-2xl font-serif font-semibold ml-10 sm:ml-0 mb-2 sm:mb-0'>Course content</p>
            <div className='bg-white sm:pb-20 '>
                <p className='mx-10  font-serif mb-3'>This course contain 10 chapters</p>
                <div className='bg-customBg6 sm:w-7/12 h-full  border-gray-500 border p-4 mx-10 '>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Properties of nuclear matter under extreme conditions?</AccordionTrigger>
                            <AccordionContent className='flex justify-between'>
                                <p className='w-3/4'>How nuclear matter behaves</p>
                                <p>Video</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How nuclear matter behaves?</AccordionTrigger>
                            <AccordionContent className='flex justify-between'>
                                <p>How nuclear matter behaves</p>
                                <p>Video</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How nuclear matter behaves?</AccordionTrigger>
                            <AccordionContent className='flex justify-between'>
                                <p>How nuclear matter behaves</p>
                                <p>Video</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <p className='bg-white px-10 pt-10 mt-10 text-2xl font-serif font-semibold'>Reviews</p>
                <div className="flex items-center px-10 pt-2">
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.2</p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                </div>
                <p className='px-10 mt-3 text-xs  text-gray-500'>800 reviews </p>

                <div className='bg-white sm:w-7/12  border-gray-500 border p-4 mx-10 mt-10'>
                    <div>
                        <div className='flex'>
                            <Avatar>
                                <AvatarImage src="/profile.png" alt="profile" />
                                <AvatarFallback>Profile image</AvatarFallback>
                            </Avatar>
                            <p className='mt-2 ml-3'>John</p>
                        </div>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">14 sep 2023</p>
                        </div>
                        <p className='mt-2 text-sm '>This course is quite comprehensive when compared with other courses available on this platform that is why I bought it. It is packed full with amazing content and like the description, it did make me full stack web developer.</p>
                        <hr className='my-3 w-full' />
                    </div>
                    <div>
                        <div className='flex'>
                            <Avatar>
                                <AvatarImage src="/profile.png" alt="profile" />
                                <AvatarFallback>Profile image</AvatarFallback>
                            </Avatar>
                            <p className='mt-2 ml-3'>John</p>
                        </div>
                        <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">14 sep 2023</p>
                        </div>
                        <p className='mt-2 text-sm '>This course is quite comprehensive when compared with other courses available on this platform that is why I bought it. It is packed full with amazing content and like the description, it did make me full stack web developer.</p>
                        <hr className='mt-3 w-full' />
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default CourseDetails