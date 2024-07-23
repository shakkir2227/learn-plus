import React, { useRef } from 'react'
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


const UsersList = () => {

    const handleUserSelect = (value: string) => {
        const userselected = value
    }

    return (
        <div>
            <div className='ml-24' >
                <Select onValueChange={(value) => handleUserSelect(value)} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Learners" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup  >
                            <SelectLabel></SelectLabel>
                            <SelectItem value="apple">Learners</SelectItem>
                            <SelectItem value="banana">Instructors</SelectItem>
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
                        {[1, 2, 3].map((invoice) => (
                            <TableRow key={invoice}>
                                <TableCell className="font-medium text-white">{invoice}</TableCell>
                                <TableCell className='text-white' >{invoice}</TableCell>
                                <TableCell className='text-white'>{invoice}</TableCell>
                                <TableCell className="text-right">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <div>
                                                <Switch checked={false} className='data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-600' id="airplane-mode" />
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
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">20 users</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

        </div>
    )
}

export default UsersList
