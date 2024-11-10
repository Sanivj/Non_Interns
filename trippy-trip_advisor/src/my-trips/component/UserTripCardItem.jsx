import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const UserTripCardItem = ({trip}) => {
    const [imageUrl, setImageUrl] = useState('/placeholder.jpg');
    const fetchPlaceImage = async (locationLabel) => {
        try {
          const response = await fetch(
            `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(locationLabel)}&image_type=photo`
          );
          const data = await response.json();
          if (data.hits && data.hits.length > 0) {
            return data.hits[0].webformatURL; 
          }
          return '/placeholder.jpg'; 
        } catch (error) {
          console.error("Error fetching image:", error);
          return '/placeholder.jpg';
        }
      };
      useEffect(() => {
        const fetchImage = async () => {
          if (trip?.userSelection?.location?.label) {
            const imgUrl = await fetchPlaceImage(trip.userSelection.location.label);
            setImageUrl(imgUrl);
          }
        };
    
        fetchImage();
      }, [trip?.userSelection?.location?.label]);
  return (
    <Link to={'/view-trip/'+trip?.id} className="no-underline text-black">
    <div className='hover:scale-105 transition-all '>
        <img src={imageUrl} alt={trip?.userSelection?.location?.label} className="object-cover rounded-xl h-[220px]" />
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-400'>{trip?.userSelection?.noOfDays} Days trip with a {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem