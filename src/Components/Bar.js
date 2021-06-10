import React from 'react'

const Bar = ({progWidth, hour, formatTime, time,viewAll}) =>{

    let barArray = []

    const fillBars = () =>{
        for(let i = 0;i<24;i++){
            let barItem;
            if(i < hour){
                barItem = <div className='bar expired'>{formatTime(i)}</div>
            }
            else if (i > hour){
                barItem = <div className='bar'>{formatTime(i)}</div>
            }
            else{
                barItem = <div className='bar'><div className='progress' style={{width:progWidth}}>{time}</div></div>
            }
            barArray = [...barArray, barItem]
        }
    }
    

    fillBars()

    // console.log(barArray)
  return (
      <>
          {viewAll ? barArray.map(item => item):
          <div className='bar'><div className='progress' style={{width:progWidth}}></div></div>}
      </>
    
  )
}

export default Bar