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
import { loadInstructors, loadLearners, updateInstructors, updateLearners } from '../../store/AdminSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import Footer from '../../components/learner/Footer'


type User = "LEARNER" | "INSTRUCTOR"

const UsersList = () => {
    const dispatch = useAppDispatch()
    const [user, setUser] = useState<User>("LEARNER") // For select
    const allLearners = useAppSelector((state) => (state.admin.allLearners))
    const allInstructors = useAppSelector((state) => (state.admin.allInstructors))

    const handleUserSelect = (value: User) => {
        setUser(value)
    }

    const toggleUserBlocking = async (role: User, id: string) => {
        const response = await userUpdateService(role, id)
        if (!response.success && response.message) {

        }
        if (response.success) {
            if (response.data?.learner) {
                dispatch(updateLearners(response.data.learner))
            } else {
                dispatch(updateInstructors(response.data?.instructor))
            }
        }
    }

    useEffect(() => {
        (async () => {
            const response = await getAllUsers()
            if (!response.success && response.message) {
                toast.custom((t) => (
                    <ErrorToastDark message={response.message as string} t={t}></ErrorToastDark>
                ))
                return
            }
            if (response.success) {
                if (response.data) {
                    dispatch(loadLearners(response.data.learners))
                    dispatch(loadInstructors(response.data.instructors))
                }
            }

        })()
    }, [])

    return (
        <div>
            <div className='ml-24' >
                <Select onValueChange={(value: User) => handleUserSelect(value)} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Learners" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup  >
                            <SelectLabel></SelectLabel>
                            <SelectItem value="LEARNER">Learners</SelectItem>
                            <SelectItem value="INSTRUCTOR">Instructors</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='pt-10'>
                <Table className='w-9/12 mx-auto'>
                    <TableCaption>A list of customers.</TableCaption>
                    <TableHeader>
                        <TableRow className='hover:bg-muted/10'>
                            <TableHead className="">No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Block</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {user === "LEARNER" ?
                            allLearners && allLearners.length &&
                            allLearners.map((learner, index) => (
                                <TableRow key={learner._id}>
                                    <TableCell className="font-medium text-white">{index + 1}</TableCell>
                                    <TableCell className='text-white' >{learner.name}</TableCell>
                                    <TableCell className='text-white'>{learner.email}</TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <div>
                                                    <Switch checked={learner.isBlocked} className='data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-600' id="airplane-mode" />
                                                </div>
                                            </AlertDialogTrigger>
                                            {!learner.isBlocked ?
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to block this user?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Blocking this user will prevent them from accessing their account and participating in the platform. This action can be reversed by unblocking the user later.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => toggleUserBlocking("LEARNER", learner._id)} >Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                                :
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to Unblock this user?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Unblocking this user will restore their access to their account and allow them to participate fully on the platform again. You can reverse this action if needed by blocking the user once more.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => toggleUserBlocking("LEARNER", learner._id)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            }
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>

                            ))

                            :
                            allInstructors && allInstructors.length &&
                            allInstructors.map((instructor, index) => (
                                <TableRow key={instructor._id}>
                                    <TableCell className="font-medium text-white">{index + 1}</TableCell>
                                    <TableCell className='text-white' >{instructor.name}</TableCell>
                                    <TableCell className='text-white'>{instructor.email}</TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <div>
                                                    <Switch checked={instructor.isBlocked} className='data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-600' id="airplane-mode" />
                                                </div>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure you want to block this user?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Blocking this user will prevent them from accessing their account and participating in the platform. This action can be reversed by unblocking the user later.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => toggleUserBlocking("INSTRUCTOR", instructor._id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>

                            ))
                        }
                    </TableBody>

                </Table>
            </div>
            <Footer />
            <Toaster />
        </div>
    )
}

export default UsersList
