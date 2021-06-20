import React from 'react'

const BarView = ({handleView}) => {

  return (
    <div className='view self-center m-1 space-x-1'>
      <button className='button w-16 border-2 border-red-500 hover:bg-red-900' onClick={() => handleView(1)}>1</button>
      <button className='button w-16 border-2 border-red-500 hover:bg-red-900' onClick={() => handleView(12)}>12</button>
      <button className='button w-16 border-2 border-red-500 hover:bg-red-900' onClick={() => handleView(24)}>24</button>
    </div>
  )
}

export default BarView

