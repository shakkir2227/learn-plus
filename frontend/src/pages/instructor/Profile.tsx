import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useAppDispatch, useAppSelector } from '../../store'
import { IoEye } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import HashLoader from 'react-spinners/HashLoader'
import { validatePasswords } from '../../utils/validatePasswords'
import ToastSuccess from '../../components/shared/ToastSuccess'
import ToastError from '../../components/shared/ToastError'
import { Textarea } from '../../components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { LogOut, Settings } from 'lucide-react'
import { updatePasswordService, updateProfileService } from '../../services/instructor/ProfileService'
import { IInstructor, updateProfile } from '../../store/InstructorSlice'

const Profile = () => {
    const { name: instructorName, email, profilePicture, bio: instructorBio } =
        useAppSelector((state) => state.instructor.instructorDetails) as IInstructor;

    const [name, setName] = useState<string>(instructorName)
    const [nameError, setNameError] = useState<string>("")
    const [image, setImage] = useState<string | null>(profilePicture)
    const [bio, setBio] = useState<string>(instructorBio)
    const [bioError, setBioError] = useState<string>("")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageRemoved, setImageRemoved] = useState<string>("false")
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const [oldPasswordError, setOldPasswordError] = useState<string>("")
    const [newPasswordError, setNewPasswordError] = useState<string>("")
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const dispatch = useAppDispatch()


    const override: CSSProperties = {
        display: "block",
        marginLeft: "50px",
        borderColor: "red",
        width: "20px"
    };

    const updateProfileDetails = async () => {
        setLoading(true)
        setNameError("")
        setBioError("")
        if (!/^[A-Za-z][A-Za-z\s]{1,28}$/.test(name)) {
            setNameError("Name should only include alphabetic characters.")
            setLoading(false)
            return
        }
        if (!/^[\w\s\., !?'"-]{1,200}$/.test(bio)) {
            setBioError("Bio: 1-200 characters, letters, numbers, and punctuation allowed.")
            setLoading(false)
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('imageRemoved', imageRemoved);
        if (imageFile) {
            formData.append('profilePicture', imageFile);
        }

        const response = await updateProfileService(formData)
        if (!response) setLoading(false)
        if (!response.success && response.message) {
            setTimeout(() => {
                setLoading(false)
                toast.custom((t) => (
                    <ToastError t={t} message={response.message} />
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
                    <ToastSuccess message={response.message} t={t} />
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
                    <ToastError t={t} message={response.message as string} />
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
                    <ToastSuccess message={response.message as string} t={t} />
                ), {
                    duration: 2000, // Auto dismiss after 2 seconds
                })
            }, 2000);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0]
        if (file && !file.type.startsWith('image/')) {
            return toast.custom((t) => (
                <ToastError t={t} message={"Please upload a file with an image format (e.g., .jpg, .png)."} />
            ), {
                duration: 2000, // Auto dismiss after 2 seconds
            });
        }
        if (file && file.type.startsWith('image/')) {
            setImageFile(file)
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target?.result) {
                    setImage(e.target?.result as string);
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setImageFile(null)
        setImageRemoved("true")
        if (imageInputRef.current) {
            imageInputRef.current.value = ""; // Removing browser cache.
        }
    }

    useEffect(() => {
        if (!image) setImage("/user-2.jpg")
    }, [image])

    return (
        <div>
            <Tabs defaultValue="account" className=''>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account details</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className=''>
                    <Card className='w-[700px]'>
                        <CardHeader>
                            <CardTitle>Account details</CardTitle>
                            <CardDescription>
                                Manage your account details here. Remember to save your changes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className='mx-auto mt-3 mb-7'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <img className=' mx-auto w-24 h-24 rounded-full object-cover border-2 border-gray-300' src={`${image}`}  ></img>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2  h-4 w-4" />
                                                <span onClick={() => { imageInputRef.current?.click() }}>Change Photo</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span onClick={handleRemoveImage}>Remove Photo</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <p className='text-center text-sm '>{email}</p>
                                <input onChange={(e) => handleImageChange(e)} type='file' accept="image/*" ref={imageInputRef} hidden></input>
                            </div>
                            <div className="space-y-2 ">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <p className='text-xs mb-1 text-red-600 '>{nameError} </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">About You</Label>
                                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a little bit about yourself" />
                                <p className='text-xs mb-1 text-red-600 '>{bioError} </p>
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
                    <Card className='w-[700px]'>
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
                                <Button onClick={() => updatePassword(oldPassword, newPassword)} >Save password</Button>
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
