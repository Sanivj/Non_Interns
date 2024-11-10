import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const PlaceCardItem = ({place}) => {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg'); 
  const fetchPlaceImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(placeName)}&image_type=photo`
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
      const imgUrl = await fetchPlaceImage(place.place_name);
      setImageUrl(imgUrl);
    };

    if (place.place_name) {
      fetchImage();
    }
  }, [place.place_name]);
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.place_name } target='_blank ' className="no-underline text-black">
    <div className='border rounded-xl p-6 mt-4 flex gap-6  items-start hover:scale-105 transition-all cursor-pointer'  >
        <img src={imageUrl} alt={place.place_name} className='w-[180px] h-[180px] rounded-xl object-cover'/>
        <div className='fflex flex-col justify-start w-full'>
          <h2 className='font-bold text-xl break-words'>{place.place_name}</h2>
          <p className='text-sm text-gray-500 mt-2 break-words'>{place.place_details}</p>
          <h2 className='mt-2'>{place.time_to_travel}🕙</h2>
          {/*<Button size="sm"><FaMapLocationDot /></Button>*/}
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem