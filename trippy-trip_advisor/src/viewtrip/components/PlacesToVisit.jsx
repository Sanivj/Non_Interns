import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
  return (
    <div className='font-bold text-lg'>
        <h2>Places To Visit</h2>
        <div>
            {trip?.tripData?.itinerary.map((item,index)=>(
                <div key={index} className='gap-5'>
                    
                    <h2 className='font-bold text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.plan.map((place,index)=>(
                      <div className='my-3'>
                        <h2 className='font-medium text-sm text-orange-500'>{place.time}</h2>
                        <PlaceCardItem place={place}/>
                      </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit