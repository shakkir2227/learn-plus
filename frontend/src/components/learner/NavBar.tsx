import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../shared/LoginButton'
import { LEARNER_ROUTE_PATHS } from '../../constants'

const NavBar = () => {
  return (
    <div className='md:mr-28 md:mt-8'>
        <ul className='md:flex md:flex-row md:gap-14 font-semibold text-sm gap-5 flex flex-col '>
              <li><Link to = {LEARNER_ROUTE_PATHS.courses}>Courses</Link> </li>
              <li><Link to="/">Pricing</Link> </li>
              <li><Link to="/">About us</Link> </li>
        </ul>
    </div>
  )
}

export default NavBar 
