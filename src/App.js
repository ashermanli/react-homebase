import React, {useState, useEffect} from 'react'
import Weather from './Components/Weather'
import Clock from './Components/Clock'
import Bar from './Components/Bar'
import List from './Components/List'
import Notification from './Components/Notification'
import './App.css'

require('dotenv').config()

function App() {

  const [time, setTime] = useState('00:00:00')
  const [hours, setHours] = useState('')
  const [progWidth, setProgWidth] = useState(0)
  const [notification, setNotification] = useState(null)
  const [viewAll, setViewAll] = useState(false)

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

  const handleNotification = (message)=>{

    setNotification(message)

    setTimeout(()=>{
      setNotification(null)
    },5000)
  }

  //toggles between a single hour bar or all 24 hour bars
  const handleView = ()=>{
    setViewAll(!viewAll)
  }
 

  return (
    <div className="Main">
      <Weather hours={hours} formatTime={formatTime}/>
      <div className="clock-bar">
        <Clock time={time}/>
        <div className="bar-section">
          <button onClick={handleView}>Change View</button>
          <Bar progWidth={progWidth} 
            hour={formatTime(new Date().getHours())} 
            formatTime={formatTime} 
            time={time}
            viewAll={viewAll}
          />
        </div>
      </div>
      <Notification notification={notification}/>
      <List handleNotification={handleNotification}/>
    </div>
  );
}

export default App;
