import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Comment = () => {
  return (
      <div className='rounded-lg divide-x-2 divide-gray-400 flex   bg-white'>
          <div className="w-3/12 flex items-center flex-col my-auto gap-1">
              <Avatar>
                  <AvatarImage src="../profile.png" alt="Profile picture" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-serif">John</p>
              <p className="text-xs sm:ml-0 ml-2 font-serif ">Joined in sep 2023</p>
          </div>
          <p className="w-9/12 sm:text-sm text-xs p-3 font-serif">
              The teacher explains complex concepts in a clear and understandable way, making difficult topics much easier to grasp. Their passion for the subject really shines through and makes the class enjoyable.
              <br /><br />  <span className="text-xs font-semibold " >Introdution to Nuclear physics | John Doe</span>
          </p>
    </div>
  )
}

export default Comment
