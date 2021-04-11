import React,{useState} from 'react'
import ListEntry from './ListEntry'

const List = ()=>{

    const[list,setList] = useState([])
    const[input,setInput] = useState('')

    const handleAdd = ()=>{
        let listItem = [...list,input]
        setList(listItem)
        setInput('')
    }

    const handleDelete = (entry)=>{

        let filteredArray = list.filter(l => l !== entry)
        setList(filteredArray)
    }

    const handleInput = (e)=>{
        console.log(e.target.value)
        setInput(e.target.value)
    }

    return(
        <div className='list'>
        <ul>
            {list.map(entry => <ListEntry key={entry} entry={entry} handleDelete={() =>handleDelete(entry)}></ListEntry>)}
        </ul>
        <div>
            <input type='text' value={input} onChange={handleInput}></input>
            <button onClick={handleAdd}>Add</button>
        </div>
        </div>
    )
}

export default List