import { Link } from "react-router-dom";
import Accordion from "../../components/instructor/Accordion";
import Header from "../../components/instructor/Header"
import Footer from "../../components/learner/Footer";
import { Button } from "../../components/ui/button"
import useAccordion from "../../hooks/useAccordion";
import { INSTRUCTOR_ROUTE_PATHS } from "../../constants";

const Home = () => {
	const { accordions, toggleAccordion } = useAccordion()

	return (
	<div className="bg-black sm:h-[2100px] h-[2850px]">

			<Header logoTheme="BLACK" iconColor="white"/>

			<div className="flex sm:flex-row flex-col items-center justify-between sm:my-24 my-16">
				<div className="sm:text-4xl text-xl font-bold ml-16 sm:mb-0 mb-10 text-white">Join the Teaching <br /> Revolution
					<br></br>
					<p className="text-xs space py-4 font-semibold sm:text-base ">	Empower Minds: Become an Instructor <br />  and Transform Lives </p>
					<Link to={INSTRUCTOR_ROUTE_PATHS.signup}>
						<Button variant={"secondary"}>Get started </Button>
					</Link>
				</div>
				<img className="rounded-3xl sm:mr-24 sm:w-[600px] w-[300px] " src="/teacher-2.jpg" alt="" />
			</div>

			<div className="bg-white sm:py-20 py-5">
				<p className="text-center sm:text-4xl text-xl  font-bold sm:mt-0 mt-5 " >Uncover Your Reasons to Start Teaching</p>
				<div className="grid sm:grid-cols-3  gap-5 sm:m-10 m-5">
					<div className="flex flex-col items-center p-5">
						<img src="/teacher-3-logo.jpg" alt="" />
						<p className="font-bold text-xl">Teach on Your Terms </p>
						<span className="text-center font-semibold text-sm">Take Control of Your Teaching Journey: Publish Your Course Exactly the Way You Envision It</span>
					</div>
					<div className="flex flex-col items-center p-5">
						<img src="/teacher-4-logo.jpg" alt="" />
						<p className="font-bold text-xl">Inspire Learners </p>
						<span className="text-center font-semibold text-sm">Share Your Expertise and Guide Learners in Exploring Interests, Gaining Skills, and Advancing Careers.</span>
					</div>
					<div className="flex flex-col items-center p-5">
						<img src="/teacher-5-logo.jpg" alt="" />
						<p className="font-bold text-xl">Unlock  Rewards </p>
						<span className="text-center font-semibold text-sm">Expand Your Professional Network, Develop Expertise, and Earn from Every Paid Enrollment.</span>
					</div>
				</div>
			</div>

			<div className="bg-white sm:h-[550px] h-[720px]">
				<p className="text-3xl font-semibold mb-10 text-center">Frequently asked questions</p>
				<div className="">
					{accordions.map((accordion) => {
						return (
							<Accordion
								key={ accordion.id}
								id={accordion.id}
								heading={accordion.heading}
								content={accordion.content}
								isOpen={accordion.isOpen}
								toggle={() => { toggleAccordion(accordion.id) }}
							/>)
					})}
				</div>
			</div>

			<Footer />

		</div>
	)
}

export default Home
