import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useAppSelector } from '../../store'
import { IoEye } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Profile = () => {
    const learnerDetails = useAppSelector((state) => (state.learner.learnerDetails))
    const [name, setName] = useState<string>("")
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)

    

    return (
        <div>
            <p className='text-xl font-semibold tracking-tight-'>Profile</p>
            <p className="text-muted-foreground text-sm">
                Update your name and password for enhanced security and personalization.
            </p>
            <hr className='my-5'></hr>
            <Tabs defaultValue="account" className=''>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account details</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account details</CardTitle>
                            <CardDescription>
                                Manage your account details here. Remember to save your changes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="username">Email</Label>
                                <Input id="username" defaultValue={learnerDetails?.email} disabled />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder={learnerDetails?.name} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button >Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Modify your password here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <div className="relative">
                                    <Input value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} id="old" type={showOldPassword ? "text" : "password"} />
                                    {showOldPassword ?
                                        <LuEyeOff onClick={() => { setShowOldPassword(false) }} className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3" />
                                        :
                                        <LuEye onClick={() => { setShowOldPassword(true) }} className="absolute cursor-pointer top-1/2 transform -translate-y-1/2 right-3" />
                                    }
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <div className="relative">
                                    <Input id="new" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type={showNewPassword ? "text" : "password"} />
                                    {showNewPassword ?
                                        <LuEyeOff onClick={() => { setShowNewPassword(false) }} className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3" /> :
                                        <LuEye onClick={() => { setShowNewPassword(true) }} className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3" />
                                    }
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Profile
