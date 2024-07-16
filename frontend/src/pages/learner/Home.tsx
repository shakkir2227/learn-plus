import NavBar from "../../components/learner/NavBar"
import LoginButton from "../../components/shared/LoginButton"
import Logo from "../../components/shared/Logo"
import ToggleNav from "../../components/learner/ToggleNav"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"
import { LEARNER_ROUTE_PATHS } from "../../constants"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { TextGenerateEffect } from "../../components/ui/text-generate-effect"
import Header from "../../components/learner/Header"
import CourseCard from "../../components/learner/CourseCard"
import Comment from "../../components/learner/Comment"
import Footer from "../../components/learner/Footer"
const words = `Quality content at your fingertips`;

const Home = () => {
    return (
        <>
            <div className="bg-customBg  md:h-[1380px] h-[1050px]">
                <Header />
                <div className="py-5 relative ">
                    <img className="md:h-full h-[230px]" src="../main-bg-img.jpg" />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                        <h2 className="text-2xl font-bold md:ml-0 ml-4 text-center"><TextGenerateEffect words={words} /></h2>
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
                    {[1, 2, 3].map((index, value) => {
                        return <CourseCard  key={value}/> // Give courseid as arg
                    })}
                </div>
            </div>
            <div className="bg-customBg3 sm:h-[1050px] h-[1460px]">
                <p className="text-center sm:text-3xl text-xl  p-10 font-semibold font-serif ">Discover What They're Saying About Us.</p>
                <div className="mt-5 md:block flex flex-col items-center md:ml-0 ml-8 pr-8">
                    <div className="md:ml-48 sm:w-6/12">
                        <Comment />
                    </div>
                    <div className="mt-5 md:ml-[600px] sm:w-6/12  ">
                        <Comment />
                    </div>
                    <div className="  mt-5 md:ml-[400px] sm:w-6/12">
                        <Comment />
                    </div>
                    <div className="flex justify-center">
                        <Button className="mt-16 ">Ready to Explore</Button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Home
