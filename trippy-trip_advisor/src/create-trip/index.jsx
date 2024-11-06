import React,{useState} from 'react'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOption,SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AI_model';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
function CreateTrip() {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState(null);
  const [travelCompanion, setTravelCompanion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tripResult, setTripResult] = useState(null);
  const [openDialog,setDialog]=useState(false);
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
    const name=e.target.name;
    
    setDestination(value);
    fetchSuggestions(value);
  };

  // Handle selection of a suggestion
  const handleSuggestionSelect = (place) => {
    setDestination(place.place_name);
    setSuggestions([]);
  };

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const handleGenerateTrip = async () => {
    
    const user=localStorage.getItem('user');

    if(!user){
      setDialog(true)
      return;
    }

    const tripData = {
      destination,
      days,
      budget,
      travelCompanion,
    };
    if(!destination||!days||!budget||!travelCompanion){
      toast("Please fill whole information");
      return;
    }
    if(parseInt(days)>5){
      console.log("Please enter number of days less than 5");
      return;
     }
    
    setLoading(true);
    setTripResult(null);
    
    const finalAIprompt=AI_PROMPT
    .replace('{location}',tripData?.destination)
    .replace('{days}',tripData?.days)
    .replace('{travelCompanion}',tripData?.travelCompanion)
    .replace('{budget}',tripData.budget)
    .replace('{days}',tripData?.days)
    console.log(finalAIprompt)
    const res=await chatSession.sendMessage(finalAIprompt)

    console.log(res?.response?.text())
    setDestination('');
    setDays('');
    setBudget(null);
    setTravelCompanion(null);
    setSuggestions([]);
    
  };
  
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https:\\www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers:{
          Authorization:`Bearer ${tokenInfo?.access_token}`,
          Accept:'Application/json'
        }
      }
    ).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data))
      setDialog(false);
      handleGenerateTrip();
    })
  }

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
            className={`p-4 border rounded-lg hover:shadow cursor-pointer text-center ${budget===item.title?'bg-gray-200 shadow-lg border-black':''}`} 
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
            className={`p-4 border rounded-lg hover:shadow cursor-pointer text-center ${travelCompanion===item.title? 'bg-gray-200 shadow-lg border-black' : ''}`}
            onClick={()=>setTravelCompanion(item.title)}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-gray-500 text-sm'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
          <div className='my-10 justify-end flex'>
          <Button onClick={handleGenerateTrip} disabled={loading}>{loading?'Generating....':'Generate Trip'}</Button>
          </div>
          <Dialog open={openDialog}>
            
            <DialogContent>
              <DialogHeader>

                <DialogDescription>
                  <img src="/logo.svg"/>
                  <h2 className='font-bold text-lg mt-7'>Sign In with google</h2>
                  <p>Sign in to the app with Google Authentication Securely</p>
                  <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className='h-7 w-7' />Sign In with google</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/*Display generated trip plan */}
          {
            tripResult&&(
              <div className='mt-10'>
                <h2 className='font-bold text-xl'>Your custom travel plan</h2>
                <pre className='bg-gray-100 p-4 rounded mt-3'>{JSON.stringify(tripResult,null,2)}</pre>
              </div>
            )
          }
    </div>
  )
}

export default CreateTrip