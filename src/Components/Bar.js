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
        barItem = <div className='bar expired w-full h-8 border 2 border-red-500' >{formatTime(display)}</div>
      }
      else if (display > hour){
        barItem = <div className='bar w-full h-8 border 2 border-red-500 bg-green-500'>{formatTime(display)}</div>
      }
      else{
        barItem = <div className='bar w-full h-8 border-2 border-red-600 bg-green-500 z-0'><div className='progress h-full bg-black' style={{width:progWidth}}>{time}</div></div>
      }
      barArray = [...barArray, barItem]
    }
  }
    

  fillBars(view)

  // console.log(barArray)
  return (
    <div className='text-green-800'>
      {view !== 1 ? barArray.map(item => item):
        <div className='bar w-full h-8 border-2 border-red-600 bg-green-500 z-0'><div className='progress h-full bg-black' style={{width:progWidth}}></div></div>}
    </div>
    
  )
}

export default Bar