import React, {useEffect, useState} from 'react'

const Bar = ({progWidth, hour, formatTime, time,view, weatherData}) =>{

  const [hourlyForecast, setHourlyForecast] = useState([])
  const [hourlyInfo, setHourlyInfo] = useState([])
  

  let barArray = []
  

  useEffect(()=>{

    if(weatherData != null){
      
      // console.log(weatherData)
      setHourlyForecast(weatherData.hourly)

      console.log(hourlyForecast)
    }

    let info

    let infoArray = []
    

    if(hourlyForecast.length !== 0){
      for(let i = 0; i < 24; i++){
        info = {
          'temp':hourlyForecast[i].temp,
          'time':new Date(hourlyForecast[i].dt * 1000).getHours(), 
          'icon':hourlyForecast[i].weather[0].icon
        }
        infoArray = [...infoArray, info]
        
        console.log(info.temp, info.time, info.icon)
      }
    }
  
    console.log(infoArray)
    setHourlyInfo(infoArray)

  },[weatherData])


 
  const fillBars = (view) =>{
    
    let iconCode
    let iconString

    for(let i = 0;i<view;i++){
      //Make time display independent of iteration for different views
      let display = i


      if(hourlyInfo.length !== 0){
        iconCode = hourlyInfo ? hourlyInfo[display].icon: ''
        iconString = `https://openweathermap.org/img/w/${iconCode}.png`
      }

      //If the view chosen is 12 and the time is past 12, show the last 12 hours of the day
      if(view === 12){
        if(hour >= 12)display+=12
      }

      let barItem
      if(display < hour){
        barItem = 
        <div key={i}className='flex flex-row justify-between w-full h-8 border border-red-500' >
          {formatTime(display)}
        </div>
      }
      else if (display > hour){
        barItem = 
        <div key={i} className='flex flex-row justify-between w-full h-8 border border-red-500 bg-green-500'>
          {formatTime(display)}
          <img src={iconString}/>
          <span>{hourlyInfo.length !== 0 ? hourlyInfo[i-3].time: ''}</span>
        </div>
      }
      else{
        barItem = 
        <div key={i} className='w-full h-8 flex flex-row justify-between border border-red-600 bg-green-500 z-0'>
          <div className='progress h-full bg-black' style={{width:progWidth}}>
            {time}
          </div>
          <img src={iconString}/>
          <span>{hourlyInfo.length !== 0 ? hourlyInfo[i-3].time: ''}</span>
        </div>
      }
      barArray = [...barArray, barItem]
    }
  }
    

  fillBars(view)

  // console.log(barArray)
  return (
    <div className='text-green-800 space-y-1'>
      {view !== 1 ? barArray.map(item => item):
        <div className='bar w-full h-8 border border-red-600 bg-green-500 z-0'><div className='progress h-full bg-black' style={{width:progWidth}}></div></div>}
    </div>
    
  )
}

export default Bar