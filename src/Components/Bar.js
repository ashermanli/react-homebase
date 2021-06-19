import React from 'react'

const Bar = ({progWidth, hour, formatTime, time,view}) =>{

  let barArray = []

  const fillBars = (view) =>{
    
    for(let i = 0;i<view;i++){
      //Make time display independent of iteration for different views
      let display = i

      //If the view chosen is 12 and the time is past 12, show the last 12 hours of the day
      if(view === 12){
        if(hour >= 12)display+=12
      }

      let barItem
      if(display < hour){
        barItem = <div className='bar expired'>{formatTime(display)}</div>
      }
      else if (display > hour){
        barItem = <div className='bar'>{formatTime(display)}</div>
      }
      else{
        barItem = <div className='bar'><div className='progress' style={{width:progWidth}}>{time}</div></div>
      }
      barArray = [...barArray, barItem]
    }
  }
    

  fillBars(view)

  // console.log(barArray)
  return (
    <>
      {view !== 1 ? barArray.map(item => item):
        <div className='bar'><div className='progress' style={{width:progWidth}}></div></div>}
    </>
    
  )
}

export default Bar