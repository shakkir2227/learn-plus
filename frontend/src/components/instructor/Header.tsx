import React from 'react'
import Logo from '../shared/Logo'
import LoginButton from '../shared/LoginButton'
import { useAppDispatch, useAppSelector } from '../../store'
import { FaRegUserCircle } from "react-icons/fa";
import { PiChatCircleDots } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { INSTRUCTOR_BASE_URL, INSTRUCTOR_ROUTE_PATHS, LEARNER_ROUTE_PATHS, ROUTE_PATHS } from '../../constants'
import ToggleNav from './ToggleNav'
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { logoutService } from '../../services/instructor/AuthService';
import toast from 'react-hot-toast';
import ToastError from '../shared/ToastError';
import { logout } from '../../store/InstructorSlice';

type Props = {
    logoTheme: "WHITE" | "BLACK",
    iconColor: "white" | "black"
}

const Header: React.FC<Props> = ({ logoTheme, iconColor }) => {
    const isLoggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))
    const instructorDetails = useAppSelector((state) => (state.instructor.instructorDetails))
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const variant = logoTheme === "WHITE" ? "default" : "secondary"

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
            navigate(INSTRUCTOR_ROUTE_PATHS.login)
        }
    }

    return (
        <div>
            <div className="md:flex justify-between  hidden">
                <Logo theme={logoTheme} user='INSTRUCTOR' />
                {isLoggedIn ?
                    <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                        <Link to={INSTRUCTOR_ROUTE_PATHS.dashboard}>
                            <Button variant={variant}>Dashboard</Button>
                        </Link>
                        <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                            <PiChatCircleDots color={iconColor} size={35} />
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/user-2.jpg" alt="@shadcn" />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{instructorDetails?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {instructorDetails?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link to={INSTRUCTOR_ROUTE_PATHS.account}>
                                        <DropdownMenuItem>
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    :
                    <LoginButton user='INSTRUCTOR' />
                }
            </div>
            <div className="md:hidden block ">
                <ToggleNav logoTheme={logoTheme} iconColor={iconColor} />
            </div>
        </div>
    )
}

export default Header
