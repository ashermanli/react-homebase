import React from 'react'

const listEntry = ({entry,id, handleDelete}) =>{

    
    return(
        <>
        <li key={id}>{entry} <button onClick={handleDelete}>Delete</button></li>
        </>
    )
}

export default listEntry