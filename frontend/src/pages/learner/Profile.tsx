import React, { CSSProperties, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useAppDispatch, useAppSelector } from '../../store'
import { IoEye } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { updatePasswordService, updateProfileService } from '../../services/learner/ProfileService'
import toast, { Toaster } from 'react-hot-toast'
import { updateProfile } from '../../store/LearnerSlice'
import { useDispatch } from 'react-redux'
import HashLoader from 'react-spinners/HashLoader'
import { validatePasswords } from '../../utils/validatePasswords'
import ToastSuccess from '../../components/shared/ToastSuccess'
import ToastError from '../../components/shared/ToastError'


const Profile = () => {
    const learnerDetails = useAppSelector((state) => (state.learner.learnerDetails))
    const [name, setName] = useState<string>("")
    const [nameError, setNameError] = useState<string>("")
    const [oldPasswordError, setOldPasswordError] = useState<string>("")
    const [newPasswordError, setNewPasswordError] = useState<string>("")
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState<boolean>(false)

    const override: CSSProperties = {
        display: "block",
        marginLeft: "50px",
        borderColor: "red",
        width: "20px"
    };

    const updateProfileDetails = async () => {
        setNameError("")
        if (name === learnerDetails?.name) return
        setLoading(true)
        if (!/^[A-Za-z][A-Za-z\s]{1,28}$/.test(name)) {
            setNameError("Name should only include alphabetic characters.")
            setLoading(false)
            return
        }
        const response = await updateProfileService(name)
        if (!response) setLoading(false)
        if (!response.success && response.message) {
            setTimeout(() => {
                setLoading(false)
                toast.custom((t) => (
                    <ToastError t={t} response={response} />
                ), {
                    duration: 2000, // Auto dismiss after 2 seconds
                });
            }, 2000);
        }
        if (response.success && response.message) {
            setTimeout(() => {
                dispatch(updateProfile(response.data))
                setLoading(false)
                return toast.custom((t) => (
                    <ToastSuccess response={response} t={t} />
                ), {
                    duration: 2000, // Auto dismiss after 2 seconds
                })
            }, 2000);
        }
    }

    const updatePassword = async (oldPassword: string, newPassword: string) => {
        setLoading(true)
        setOldPasswordError("")
        setNewPasswordError("")

        const isPasswordsValid = validatePasswords(oldPassword, newPassword,
            setOldPasswordError, setNewPasswordError)
        if (!isPasswordsValid) {
            setLoading(false)
            return false
        }
        const response = await updatePasswordService(oldPassword, newPassword)
        if (!response.success && response.message) {
            setTimeout(() => {
                setLoading(false)
                toast.custom((t) => (
                    <ToastError t={t} response={response} />
                ), {
                    duration: 2000, // Auto dismiss after 2 seconds
                });
            }, 2000);
        }
        if (response.success && response.message) {
            setTimeout(() => {
                setNewPassword("")
                setOldPassword("")
                setLoading(false)
                return toast.custom((t) => (
                    <ToastSuccess response={response} t={t} />
                ), {
                    duration: 2000, // Auto dismiss after 2 seconds
                })
            }, 2000);
        }
    }

    useEffect(() => {
        if (learnerDetails && learnerDetails.name) {
            setName(learnerDetails.name)
        }
    }, [])

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
                                <Input id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <p className='text-xs mb-1 text-red-600 '>{nameError} </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {loading ? <HashLoader
                                loading={loading}
                                cssOverride={override}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader" /> :
                                <Button onClick={updateProfileDetails} >Save changes</Button>
                            }

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
                                    <p className='text-xs my-1 text-red-600  '>{oldPasswordError} </p>
                                    {showOldPassword ?
                                        <LuEyeOff onClick={() => { setShowOldPassword(false) }} className="cursor-pointer absolute top-1/4  right-3" />
                                        :
                                        <LuEye onClick={() => { setShowOldPassword(true) }} className="cursor-pointer absolute top-1/4  right-3" />
                                    }
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <div className="relative">
                                    <Input id="new" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type={showNewPassword ? "text" : "password"} />
                                    {showNewPassword ?
                                        <LuEyeOff onClick={() => { setShowNewPassword(false) }} className="cursor-pointer absolute top-1/4  right-3" /> :
                                        <LuEye onClick={() => { setShowNewPassword(true) }} className="cursor-pointer absolute top-1/4  right-3" />
                                    }
                                    <p className='text-xs my-1 text-red-600  '>{newPasswordError} </p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {loading ? <HashLoader
                                loading={loading}
                                cssOverride={override}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader" /> :
                                <Button onClick={() => updatePassword(oldPassword, newPassword)}>Save password</Button>
                            }
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            <div><Toaster /></div>
        </div>
    )
}

export default Profile
