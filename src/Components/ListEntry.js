import React from 'react'

const listEntry = ({entry,id, handleDelete}) =>{

    
  return(
    <>
      <li className='w-4/5 p-4 flex flex-row items-center justify-between border-2 border-red-500' key={id}>{entry} <button className='w-16 border-2 border-red-500' onClick={handleDelete}>Delete</button></li>
    </>
  )
}

export default listEntry