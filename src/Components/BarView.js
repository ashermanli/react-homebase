import React from 'react'

const BarView = ({handleView}) => {

  return (
    <div className='view'>
      <button className='button' onClick={() => handleView(1)}>1</button>
      <button className='button' onClick={() => handleView(12)}>12</button>
      <button className='button' onClick={() => handleView(24)}>24</button>
    </div>
  )
}

export default BarView

