import React, {useState,useEffect, useRef} from 'react'
import axios from 'axios'

const Weather = ({WEATHER_KEY}) =>{

    const [loading, setLoading] =useState(false)
    const [coordinates, setCoordinates] = useState([])
    const [weatherData, setWeatherData] = useState(null)
    const [info, setInfo] = useState([])
    

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
    },[coordinates])

    useEffect(()=>{
       if(weatherData != null)fillInfo()
    },[weatherData])

    const fillInfo = ()=>{
        const fill = {
            'temp': weatherData.current.temp,
            'sunrise': weatherData.current.sunrise,
            'sunset': weatherData.current.sunset,
            'windSpeed': weatherData.current.wind_speed,
            'windDeg': weatherData.current.wind_deg
        }

        const entries = Object.entries(fill)

        const infoArray = []

        for(const [key,value] of entries){
            const text = (key === 'temp') ? `${key}:${value}°F`: `${key}:${value}`
            console.log(text)
            setInfo([...info,text])
        }

        // setInfo(info.concat(infoArray))
        // console.log(infoArray)
        // console.log(info)
        
    }

    if(loading){
        return (
            <p className='weather'>Gathering Data</p>
        )
    }


    
    return(
        <div>
            {info.length === 0 ? 'Awaiting Data': 
            <ul className='weather'>
                {info.map(entry => <li>{entry}</li>)}
            </ul>
            }
        </div>
    )
    
}

export default Weather