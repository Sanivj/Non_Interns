{/*import React from 'react'
import { Link } from 'react-router-dom';


const Hotels = ({trip}) => {
  const hotelImages = [
    '/hotel-images/s-1.jpg',
    '/hotel-images/s-2.jpg',
    '/hotel-images/s-3.jpg',
    '/hotel-images/s-4.jpg',
    '/hotel-images/s-5.jpg',
  ];


  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {trip?.tripData?.hotel_options?.map((hotel,index)=>(
                const randomImage = hotelImages[Math.floor(Math.random() * hotelImages.length)];
                return(
                  <div key={index} className='hover:scale-105 transition-all cursor-pointer' >
                
                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotel_name+","+hotel.hotel_address} target='_blank'>
                
                </Link>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4">
              <h3 className="font-semibold">{hotel.hotel_name}</h3>
              <p>{hotel.description}</p>
              <p>{hotel.hotel_address}</p>
              <p>Price: {hotel.price}</p>
              <p>Rating: {hotel.rating}⭐</p>
            </div>
                </div>
                );
                
            ))}
        </div>
    </div>
  )
};

export default Hotels*/}
import React from 'react';
import { Link } from 'react-router-dom';

const Hotels = ({ trip }) => {
  // List of images stored in the public folder
  const hotelImages = [
    '/s-1.jpg',
    '/s-2.jpg',
    '/s-3.jpg',
    '/s-4.jpg',
    '/s-5.jpg',
  ];

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {trip?.tripData?.hotel_options?.map((hotel, index) => {
          
          const randomImage = hotelImages[Math.floor(Math.random() * hotelImages.length)];

          return (
            <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
              <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotel_name + "," + hotel.hotel_address} target='_blank'>
                
                <img src={randomImage} alt={hotel.hotel_name} className="w-full h-[200px] object-cover rounded-md" />
              </Link>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4">
                <h3 className="font-semibold">{hotel.hotel_name}</h3>
                <p>{hotel.description}</p>
                <p>{hotel.hotel_address}</p>
                <p>Price: {hotel.price}</p>
                <p>Rating: {hotel.rating}⭐</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hotels;
