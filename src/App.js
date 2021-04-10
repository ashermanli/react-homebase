import React, {useState, useEffect} from 'react'
import Weather from './Components/Weather'
import Clock from './Components/Clock'
import Bar from './Components/Bar'
import config from './config.js'
import './App.css'

function App() {

  const [time, setTime] = useState('00:00:00')
  const [hours, setHours] = useState('')
  const [progWidth, setProgWidth] = useState(0)
  

  const WEATHER_KEY = config.WEATHER_KEY || null

  //Function to return the current time
  const currentTime = () =>{
    const date = new Date()
    const hour = formatTime(date.getHours())
    const min = formatTime(date.getMinutes())
    const sec = formatTime(date.getSeconds())


    setTime(hour+":"+min+":"+sec)
    setHours(hour)
    calcProgWidth(min,sec)
  }

  //Pads the time with extra zeroes if necessary
  const formatTime = (time) =>{
    const formatted = time<10? "0"+time: time
    return formatted
  }

  //calculates the width of the progess bar
  const calcProgWidth = (min, sec) =>{
    const currentWidth = ((min/60)*100 + (sec/3600)*100)+'%'
    setProgWidth(currentWidth)
  }


  //Runs the clock by updating every second. 
  useEffect(()=>{
    setTimeout(() => {
      currentTime()

    }, 1000)
  })

 

  return (
    <div className="Main">
      <Weather WEATHER_KEY={WEATHER_KEY} hours={hours}></Weather>
      <div className="ClockBar">
      <Clock time={time}></Clock>
      <Bar progWidth={progWidth}></Bar>
      </div>
    </div>
  );
}

export default App;
