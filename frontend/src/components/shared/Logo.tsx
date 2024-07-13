import React from 'react'
import { Link } from 'react-router-dom'

const Logo: React.FC = () => {
    return (
        <div className='md:w-52 w-32 md:pt-7 pt-8 pl-7'>
            <Link to="/">
                <img src='../public/logo.png'></img>
            </Link>
        </div>
    )
}

export default Logo
