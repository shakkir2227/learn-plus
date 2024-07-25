import React, { useEffect, useState } from 'react'
import Header from '../../components/learner/Header'
import { Separator } from '../../components/ui/separator'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LEARNER_ROUTE_PATHS, ROUTE_PATHS } from '../../constants'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import Profile from './Profile'

type Section = "PROFILE" | "PLANS" | "COURSES"

const Account = () => {
    const [section, setSection] = useState<Section>("PROFILE")

    return (
        <div>
            <Header />
            <hr className='mt-5'></hr>
            <div className="space-y-6 p-10 pb-16 ">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Account</h2>
                    <p className="text-muted-foreground">
                        Manage your profile details, preferences, and account settings here.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className='flex'>
                    <div className="w-1/3 mt-2">
                        <aside className="">
                            <nav className="flex flex-col gap-5 w-1/2 ">
                                {section === 'PROFILE' ?
                                    <p className='bg-muted hover:bg-muted cursor-pointer pl-5 py-2 rounded-sm font-semibold'
                                    >Profile</p>
                                    :
                                    <p className='pl-5  cursor-pointer  hover:underline py-2 rounded-sm font-semibold'
                                        onClick={() => setSection("PROFILE")}>Profile</p>
                                }
                                {section === 'PLANS' ?
                                    <p className='bg-muted  hover:bg-muted pl-5 py-2 cursor-pointer rounded-sm font-semibold'
                                    >Plans</p>
                                    :
                                    <p className='pl-5 hover:underline  cursor-pointer py-2 rounded-sm  font-semibold'
                                        onClick={() => setSection("PLANS")} >Plans</p>
                                }
                                {section === 'COURSES' ?
                                    <p className='bg-muted hover:bg-muted pl-5 py-2 rounded-sm cursor-pointer  font-semibold'
                                    >Courses</p>
                                    :
                                    <p className='pl-5 hover:underline rounded-sm cursor-pointer py-2 font-semibold'
                                        onClick={() => setSection("COURSES")} >Courses</p>
                                }

                            </nav>
                        </aside>
                    </div>
                    <div className='ml-[-150px] mt-1'>
                        {section === "PROFILE" ? <Profile />
                            :
                            <p>Here</p>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Account
