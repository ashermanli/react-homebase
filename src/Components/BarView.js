import React from 'react'

const BarView = ({handleView}) => {

  return (
    <div className='view self-center'>
      <button className='button w-16 border-2 border-red-500' onClick={() => handleView(1)}>1</button>
      <button className='button w-16 border-2 border-red-500' onClick={() => handleView(12)}>12</button>
      <button className='button w-16 border-2 border-red-500' onClick={() => handleView(24)}>24</button>
    </div>
  )
}

export default BarView

