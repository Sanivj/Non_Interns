import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";

const InfoSection = ({trip}) => {
  return (
    <div>
        <img src='/placeholder.jpg' className='h-[340px] w-full object-cover rounded-xl' />
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label||'No destination selected'}</h2>
            <div className='flex gap-5'>
              <p className='p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</p>
              <p className='p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md'>💸 {trip?.userSelection?.budget} budget</p>
              <p className='p-1 px-3 bg-gray-200 rounded-full text-gray text-xs md:text-md'>🥂 No. of Traveller: {trip?.userSelection?.traveller} Day</p>
            </div>
        </div>
        <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection