import React from 'react'

const listEntry = ({entry, handleDelete}) =>{

    
    return(
        <>
        <li key={entry}>{entry} <button onClick={handleDelete}>Delete</button></li>
        </>
    )
}

export default listEntry