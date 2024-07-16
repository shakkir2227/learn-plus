import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

type Props = {
    id: number,
    heading: string,
    content: string,
    isOpen: boolean
    toggle: () => void
}

const Accordion: React.FC<Props> = ({ heading, content, isOpen, toggle }) => {

    return (
        <div>
            <div className="flex sm:w-6/12 w-9/12 mx-auto justify-between cursor-pointer" onClick={() => toggle()}>
                <p>{heading}</p>
                <IoIosArrowDown  className='cursor-pointer' onClick={() => toggle()} />
            </div>
            {isOpen &&
                <p className={`sm:w-6/12 w-9/12 mx-auto mt-5 text-xs`}>
                    {content}
                </p>
            }
            <hr className="w-6/12 mx-auto mt-3 mb-3" />
        </div>
    )
}





export default Accordion
