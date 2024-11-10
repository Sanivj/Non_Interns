import React from 'react'

const Hotels = ({trip}) => {
    const getBaseImageUrl = (url) => url.split('?')[0];
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {trip?.tripData?.hotel_options?.map((hotel,index)=>(
                <div key={index} className='hover:scale-105 transition-all cursor-pointer' >
                    <img 
              src={getBaseImageUrl(hotel.hotel_image_url) || '/placeholder.jpg'} 
              alt={hotel.hotel_name} 
              className="rounded-xl" 
            />
            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4">
              <h3 className="font-semibold">{hotel.hotel_name}</h3>
              <p>{hotel.description}</p>
              <p>{hotel.hotel_address}</p>
              <p>Price: {hotel.price}</p>
              <p>Rating: {hotel.rating}⭐</p>
            </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Hotels