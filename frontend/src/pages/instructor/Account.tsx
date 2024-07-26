import React, { useEffect, useState } from 'react'
import { Separator } from '../../components/ui/separator'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LEARNER_ROUTE_PATHS, ROUTE_PATHS } from '../../constants'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import Profile from './Profile'
import Header from '../../components/instructor/Header'

type Section = "PROFILE" | "PLANS" | "COURSES"

const Account = () => {
    const [section, setSection] = useState<Section>("PROFILE")

    return (
        <div>
            <Header iconColor='black' logoTheme='WHITE' />
            <hr className='mt-5'></hr>
            <div className="space-y-6 p-10 pb-16 w-7/12 mx-auto ">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Account</h2>
                    <p className="text-muted-foreground">
                        Manage your profile details, preferences, and account settings here.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className='flex'>
                   
                    <div className=' mt-1'>
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
