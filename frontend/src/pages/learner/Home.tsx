import NavBar from "../../components/learner/NavBar"
import LoginButton from "../../components/shared/LoginButton"
import Logo from "../../components/shared/Logo"
import ToggleNav from "../../components/learner/ToggleNav"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { LEARNER_ROUTE_PATHS } from "../../constants"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { TextGenerateEffect } from "../../components/ui/text-generate-effect"
import { FaUserCircle } from "react-icons/fa";
const words = `Quality content at your fingertips`;

const Home = () => {
    return (
        <>
            <div className="bg-customBg  md:h-[1380px] h-[1050px]">
                <div className="md:flex justify-between  hidden">
                    <Logo />
                    <NavBar />
                    <LoginButton />
                </div>
                <div className="md:hidden block ">
                    <ToggleNav />
                </div>
                <div className="py-5 relative ">
                    <img className="md:h-full h-[230px]" src="../main-bg-img.jpg" />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                        <h2 className="text-2xl font-bold md:ml-0 ml-4"><TextGenerateEffect words={words} /></h2>
                    </div>
                </div>
                <div className="md:pt-5 text center">
                    <p className="md:text-4xl text-md font-bold text-center ">
                        Discover the Power of Learning
                    </p>
                </div>
                <div className="flex md:flex-row flex-col justify-around md:mt-10 mt-4 bg-black md:py-12 ">
                    <div className="md:mt-20 mt-5 md:text-3xl md:mb-0 mb-5 text-xl text-white px-8 font-serif ">Power your knowledge <br></br> with engaging content for <br /> every step of your learning journey.
                        <br /> <p className="md:text-base text-xs mt-5"><span className="font-extrabold">Learn Plus</span> is a leading content expert and your <br /> trusted learning partner. We help you meet your upskilling <br />professional development goals with content from a  <br />diverse range of experts.
                        </p>
                        <Link to={LEARNER_ROUTE_PATHS.signup}>
                            <Button className="mt-5 " variant={"secondary"}>Get started</Button>
                        </Link>
                    </div>
                    <img className="pr-4 w-[300px] md:w-[650px] md:mt-0 mt-3 mx-auto pb-10" src="../bg-6.png"></img>
                </div>
            </div>
            <div className="md:h-[500px] h-[1050px] md:mt-0 mt-5">
                <div className="flex justify-between">
                    <p className="md:px-10 px-5 py-10 md:text-2xl font-serif font-semibold">Trending Now</p>
                    <p className="md:px-10 px-5 py-10  md:text-md text-sm underline font-serif">See All</p>
                </div>
                <div className="flex md:flex-row gap-4 flex-col justify-around ">
                    <div className="bg-customBg flex flex-col gap-2 md:w-3/12 w-4/6 md:mx-0 mx-auto md:h-52 rounded-2xl hover:opacity-70 cursor-pointer">
                        <p className="font-semibold p-5 font-serif ">Master The Fundamentals Of Chemistry <br></br>
                            <span className="text-xs font-light">Rahsoft</span>
                            <br />
                            <span className="text-xs font-light">Chemistry | English</span>
                        </p>
                        <p className="text-xs font-semibold p-5">10,465 students Enrolled </p>
                    </div>
                    <div className="bg-customBg flex flex-col gap-2 md:w-3/12 w-4/6 md:mx-0 mx-auto md:h-52 rounded-2xl hover:opacity-70 cursor-pointer">
                        <p className="font-semibold p-5 font-serif ">Master The Fundamentals Of Chemistry <br></br>
                            <span className="text-xs font-light">Rahsoft</span>
                            <br />
                            <span className="text-xs font-light">Chemistry | English</span>
                        </p>
                        <p className="text-xs font-semibold p-5">10,465 students Enrolled </p>
                    </div>
                    <div className="bg-customBg flex flex-col gap-2 md:w-3/12 w-4/6 md:mx-0 mx-auto md:h-52 rounded-2xl hover:opacity-70 cursor-pointer">
                        <p className="font-semibold p-5 font-serif ">Master The Fundamentals Of Chemistry <br></br>
                            <span className="text-xs font-light">Rahsoft</span>
                            <br />
                            <span className="text-xs font-light">Chemistry | English</span>
                        </p>
                        <p className="text-xs font-semibold p-5">10,465 students Enrolled </p>
                    </div>
                </div>
            </div>
            <div className="bg-customBg3 md:h-[1100px] h-[1650px]">
                <p className="text-center sm:text-3xl text-xl  p-10 font-semibold font-serif ">Discover What They're Saying About Us.</p>
                <div className="mt-5 md:block flex flex-col">
                    <div className="md:w-5/12 w-10/12 mx-auto  bg-white  md:ml-48 rounded-lg divide-x-2 divide-gray-400 flex">
                        <div className="w-3/12 flex items-center flex-col my-auto gap-1">
                            <Avatar>
                                <AvatarImage src="../profile.png" alt="Profile picture" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>John</p>
                            <p className="text-xs sm:ml-0 ml-2">Joined in sep 2023</p>
                        </div>
                        <p className="w-9/12 sm:text-sm text-xs p-3">
                            The teacher explains complex concepts in a clear and understandable way, making difficult topics much easier to grasp. Their passion for the subject really shines through and makes the class enjoyable.
                            <br /><br />  <span className="text-xs font-semibold " >Introdution to Nuclear physics | John Doe</span>
                        </p>
                    </div>

                    <div className="md:w-5/12  w-10/12 mx-auto mt-5 bg-white  md:ml-[600px] rounded-lg divide-x-2 divide-gray-400 flex">
                        <div className="w-3/12 flex items-center flex-col my-auto">
                            <Avatar>
                                <AvatarImage src="../profile.png" alt="Profile picture" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>John</p>
                            <p className="text-xs sm:ml-0 ml-2">Joined in sep 2023</p>
                        </div>
                        <p className="w-9/12 sm:text-sm text-xs p-3">
                            The teacher explains complex concepts in a clear and understandable way, making difficult topics much easier to grasp. Their passion for the subject really shines through and makes the class enjoyable.
                            <br /><br />  <span className="text-xs font-semibold " >Introdution to Nuclear physics | John Doe</span>
                        </p>
                    </div>
                    <div className="md:w-5/12 w-10/12 mx-auto mt-5 bg-white md:ml-[400px] rounded-lg divide-x-2 divide-gray-400 flex">
                        <div className="w-3/12 flex items-center flex-col my-auto">
                            <Avatar>
                                <AvatarImage src="../profile.png" alt="Profile picture" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>John</p>
                            <p className="text-xs sm:ml-0 ml-2">Joined in sep 2023</p>
                        </div>
                        <p className="w-9/12 sm:text-sm text-xs p-3">
                            The teacher explains complex concepts in a clear and understandable way, making difficult topics much easier to grasp. Their passion for the subject really shines through and makes the class enjoyable.
                            <br /><br />  <span className="text-xs font-semibold " >Introdution to Nuclear physics | John Doe</span>
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Button className="mt-16">Ready to Explore</Button>
                    </div>
                </div>

                <div className="grid justify-center p-10 bg-black mt-16 ">
                    <div className="">
                        <p className="text-white text-xs">© Copyright 2024 | All Rights Reserved | Privacy Policy</p>
                    </div>

                </div>

            </div>
        </>



    )
}

export default Home
