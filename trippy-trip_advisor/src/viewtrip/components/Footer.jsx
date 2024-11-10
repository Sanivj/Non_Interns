import React from 'react'

const Footer = ({trip}) => {
  return (
    <div className='my-7'>
        <h2 className='text-center text-gray-400'>Created by Trippy🌞 for {trip.userEmail}</h2>
    </div>
  )
}

export default Footer