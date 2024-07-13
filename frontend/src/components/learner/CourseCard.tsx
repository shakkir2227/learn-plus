import React from 'react'

const CourseCard = () => {
    return (
        <div className="bg-customBg flex flex-col gap-2 md:w-3/12 w-4/6 md:mx-0 mx-auto md:h-52 rounded-2xl hover:opacity-70 cursor-pointer">
            <p className="font-semibold p-5 font-serif ">Master The Fundamentals Of Chemistry <br></br>
                <span className="text-xs font-light">Rahsoft</span>
                <br />
                <span className="text-xs font-light">Chemistry | English</span>
            </p>
            <p className="text-xs font-semibold p-5">10,465 students Enrolled </p>
        </div>
    )
}

export default CourseCard
