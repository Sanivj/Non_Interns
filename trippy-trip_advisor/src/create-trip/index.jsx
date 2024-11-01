import React,{useState} from 'react'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { Input } from '@/components/ui/input';
import { SelectBudgetOption,SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
function CreateTrip() {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState(null);
  const [travelCompanion, setTravelCompanion] = useState(null);

  const geocodingClient = mbxGeocoding({
    accessToken: import.meta.env.VITE_MAP_BOX_API_KEY,
   });

  // Function to fetch autocomplete suggestions based on user input
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await geocodingClient
        .forwardGeocode({
          query,
          autocomplete: true,
          limit: 5, // Limits the number of suggestions
        })
        .send();

      if (response && response.body && response.body.features) {
        setSuggestions(response.body.features);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchSuggestions(value);
  };

  // Handle selection of a suggestion
  const handleSuggestionSelect = (place) => {
    setDestination(place.place_name);
    console.log(place.place_name);
    setSuggestions([]);
  };

  const handleGenerateTrip = () => {
    const tripData = {
      destination,
      days,
      budget,
      travelCompanion,
    };
    console.log('Trip Data:', tripData);
    setDestination('');
    setDays('');
    setBudget(null);
    setTravelCompanion(null);
    setSuggestions([]);
    
  };
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your Travel preference🏕️🌲</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preference.
      </p>
      
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is the destination of your choice?</h2>
          <input
            type='text'
            value={destination}
            onChange={handleInputChange}
            className='border border-gray-300 rounded px-3 py-2 w-full'
            placeholder='Enter a destination'
          />

          {/* Displaying autocomplete suggestions */}
          {suggestions.length > 0 && (
            <ul className='border border-gray-300 mt-2 rounded'>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className='px-3 py-2 cursor-pointer hover:bg-gray-200'
                >
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
          )}
          <h2 className='mt-10 text-xl my-3 font-medium'>How many days are you planning for?</h2>
          <Input placeholder={'Ex.3'} type="number" value={days} onChange={(e)=>setDays(e.target.value)}/>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOption.map((item,index)=>(
            <div key={index}
            className={`p-4 border rounded-lg hover:shadow cursor-pointer text-center ${budget===item.title?'bg-gray-200':''}`} 
            onClick={()=>setBudget(item.title)}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>Who do you Plan to travel with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5 mb-5'>
          {SelectTravelsList.map((item,index)=>(
            <div key={index} 
            className={`p-4 border rounded-lg hover:shadow cursor-pointer text-center ${travelCompanion===item.title? 'bg-gray-200' : ''}`}
            onClick={()=>setTravelCompanion(item.title)}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
          <div className='my-10 justify-end flex'>
          <Button onClick={handleGenerateTrip}>Generate Trip</Button>
          </div>
    </div>
  )
}

export default CreateTrip