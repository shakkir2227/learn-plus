import React from 'react'
import Logo from '../shared/Logo'
import LoginButton from '../shared/LoginButton'
import { useAppDispatch, useAppSelector } from '../../store'
import { FaRegUserCircle } from "react-icons/fa";
import { PiChatCircleDots } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { INSTRUCTOR_ROUTE_PATHS, LEARNER_ROUTE_PATHS, ROUTE_PATHS } from '../../constants'
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { logoutService } from '../../services/admin/AuthService';
import toast from 'react-hot-toast';
import ToastError from '../shared/ToastError';
import { logout } from '../../store/AdminSlice';

type Props = {
    logoTheme: "WHITE" | "BLACK",
    iconColor: "white" | "black"
}

const Header: React.FC<Props> = ({ logoTheme, iconColor }) => {
    const isLoggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))
    const variant = logoTheme === "WHITE" ? "default" : "secondary"
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        const response = await logoutService()
        if (!response.success) {
            toast.custom((t) => (
                <ToastError t={t} message={response.message as string} />
            ), {
                duration: 2000, // Auto dismiss after 2 seconds
            });
        }
        if (response.success) {
            dispatch(logout())
            navigate(LEARNER_ROUTE_PATHS.login)
        }
    }

    return (
        <div>
            <div className="flex justify-between">
                <Logo theme={logoTheme} user='ADMIN' />
                <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/user-2.jpg" alt="profile image" />
                                    <AvatarFallback>SC</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Admin</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        admin@mail.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>

                            </DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>

        </div>
    )
}

export default Header
