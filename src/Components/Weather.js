import React, {useState,useEffect, useRef} from 'react'
import axios from 'axios'


const Weather = ({hours, formatTime}) =>{

  const [loading, setLoading] =useState(false)
  const [coordinates, setCoordinates] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [info, setInfo] = useState([])
    

  //On initial render we gather coordinates for our location
  useEffect(()=>{
    //Gets coordinates for currrent location
    const getLocationWeather = () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess,geoError)
      }
      else{
        alert('Geolocation is not supported by this browser')
      }
    }

    //On success of geolocation
    const geoSuccess = (position)=>{

      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      setCoordinates([latitude,longitude])

      // console.log("lat", latitude, "lon", longitude)
    }

    //On Failure of geolocation
    const geoError = ()=>{
      alert('Geolocation failed')
    }

    getLocationWeather()
  },[])

  //to prevent api call on initial render    
  const initialRender = useRef(true)

  //api call to retrieve weather information
  useEffect(()=>{

    const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY || null

    const weatherString = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${WEATHER_KEY}`

    if(initialRender.current){
      initialRender.current = false
    }
    else{
      setLoading(true)
      axios.get(weatherString)
        .then(response => {
          return response.data
        })
        .then(data => {
          setWeatherData(data)
          // console.log(data)
                
          //for debugging
          // const time = new Date(data.current.dt *1000)
          // const hour = time.getHours()
          // const min = time.getMinutes()
          // console.log(hour, min)
        })
        .catch(err => console.log(err))
        .finally(() => {
          setLoading(false)
        })
    }
  },[coordinates, hours])

  //Once the api call has gathered the weather data, make a call to fill the array with data we want
  useEffect(()=>{
    //convert degrees to compass directions
    const degToCompass = (num)=> {
      var val = Math.floor((num / 22.5) + 0.5)
      var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      return arr[(val % 16)]
    }

    //Fill an object with the weather information we desire
    const fillInfo = ()=>{
      const fill = {
        'forecast' :
        [
          weatherData.current.weather[0].description,
          weatherData.current.weather[0].icon
        ],
        'temp': weatherData.current.temp,
        'sunrise': weatherData.current.sunrise,
        'sunset': weatherData.current.sunset,
        'wind-Speed': weatherData.current.wind_speed,
        'windDeg': weatherData.current.wind_deg, 
      }
    
      //create iterable key value pair array
      const entries = Object.entries(fill)
            
      let infoArray = []
    
      for(const [key,value] of entries){
        // Convert the key to all uppercase ot use for display
        let attribute = key.toUpperCase()

        //Grab the icon for the current weather
        let iconCode
        if(key === 'forecast'){
          iconCode = `http://openweathermap.org/img/w/${value[1]}.png`
        }

        const content = 
        (key === 'forecast') ? <div className='flex flex-row items-center'><img src={iconCode} alt='Weather icon' className='mr-2'/><p>{value[0].toUpperCase()}</p></div> :
          (key === 'temp') ? `${attribute} : ${value}°F`: 
            (key === 'sunrise' || key === 'sunset')? `${attribute} ${formatTime(new Date(value *1000).getHours())} : ${formatTime(new Date(value *1000).getMinutes())}`:
              (key === 'windDeg')? `WIND-DIR : ${degToCompass(value)}`:
                `${attribute} : ${typeof(value) === 'string' ? value.toUpperCase() : value}`

        infoArray = [...infoArray,content]
        // console.log(infoArray)
        setInfo(infoArray)
    
      }
    }

    if(weatherData != null)fillInfo()
    //console.log(weatherData)
  },[weatherData, formatTime])

    
  //if we are waiting for the weather data, let the user know
  if(loading){
    return (
      <p className='loading self-start'>Gathering Data</p>
    )
  }


    
  return(
    <>
      {info.length === 0 ? 'Awaiting Data': 
        <ul id='weather' className='md:h-6 w-screen md:w-auto flex flex-col flex-shrink-0 items-center md:items-stretch md:flex-row md:space-x-2'>
          {info.map(entry => <li key={entry}className='p-2 flex flex-row items-center md:border-r border-green-500'> {entry} </li>)}
        </ul>
      }
    </>
    
  )
    
}

export default Weather