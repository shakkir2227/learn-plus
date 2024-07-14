import Header from "../../components/instructor/Header"
import { Button } from "../../components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const Home = () => {
	return (
		<div className=" bg-customBg md:h-[1380px] h-[2550px]">
			<Header />

			<div className="flex sm:flex-row flex-col items-center justify-between sm:my-24 my-16">
				<div className="sm:text-4xl text-xl font-bold ml-16 sm:mb-0 mb-10">Join the Teaching <br /> Revolution
					<br></br>
					<p className="text-xs space py-4 font-semibold sm:text-base ">	Empower Minds: Become an Instructor <br />  and Transform Lives </p>
					<Button>Get started </Button>
				</div>
				<img className="rounded-3xl sm:mr-24 sm:w-[600px] w-[300px] " src="../public/teacher-2.jpg" alt="" />
			</div>

			<div className="bg-white sm:py-20 py-5">
				<p className="text-center sm:text-4xl text-xl  font-bold " >Uncover Your Reasons to Start Teaching</p>
				<div className="grid sm:grid-cols-3 gap-5 m-10">
					<div className="flex flex-col items-center p-5">
						<img src="../public/teacher-3-logo.jpg" alt="" />
						<p className="font-bold text-xl">Teach your way </p>
						<span className="text-center font-semibold text-sm">Publish the course you want, in the way you want, and always have control of your own content.</span>
					</div>
					<div className="flex flex-col items-center p-5">
						<img src="../public/teacher-4-logo.jpg" alt="" />
						<p className="font-bold text-xl">Teach your way </p>
						<span className="text-center font-semibold text-sm">Publish the course you want, in the way you want, and always have control of your own content.</span>
					</div>
					<div className="flex flex-col items-center p-5">
						<img src="../public/teacher-5-logo.jpg" alt="" />
						<p className="font-bold text-xl">Teach your way </p>
						<span className="text-center font-semibold text-sm">Publish the course you want, in the way you want, and always have control of your own content.</span>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Home
