import React, {useState,useEffect, useRef} from 'react'
import axios from 'axios'
import config from './../config.js'

const Weather = ({hours}) =>{

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

        const WEATHER_KEY = config.WEATHER_KEY || null

        const weatherString = `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${WEATHER_KEY}`;

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

        const degToCompass = (num)=> {
            var val = Math.floor((num / 22.5) + 0.5);
            var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return arr[(val % 16)];
          }

        const fillInfo = ()=>{
            const fill = {
                'temp': weatherData.current.temp,
                'sunrise': weatherData.current.sunrise,
                'sunset': weatherData.current.sunset,
                'wind-Speed': weatherData.current.wind_speed,
                'windDeg': weatherData.current.wind_deg
            }
    
            const entries = Object.entries(fill)
            
            let infoArray = []
    
            for(const [key,value] of entries){
                const text = (key === 'temp') ? `${key.toUpperCase()} : ${value}°F`: 
                             (key === 'sunrise' || key === 'sunset')? `${key.toUpperCase()} ${new Date(value *1000).getHours()} : ${new Date(value *1000).getMinutes()}`:
                             (key === 'windDeg')? `WIND-DIR : ${degToCompass(value)}`:
                             `${key.toUpperCase()} : ${value}`
                infoArray = [...infoArray,text]
                // console.log(infoArray)
                setInfo(infoArray)
    
            }
        }

       if(weatherData != null)fillInfo()
       console.log(weatherData)
    },[weatherData])

    
    //if we are waiting for the weather data, let the user know
    if(loading){
        return (
            <p className='loading'>Gathering Data</p>
        )
    }


    
    return(
        <div className='loading'>
            {info.length === 0 ? 'Awaiting Data': 
            <ul id='weather'>
                {info.map(entry => <li key={entry}> {entry} </li>)}
            </ul>
            }
        </div>
    )
    
}

export default Weather