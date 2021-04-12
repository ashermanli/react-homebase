import React,{useState} from 'react'
import ListEntry from './ListEntry'

const List = ()=>{

    const[list,setList] = useState([])
    const[max, setMax] = useState(0)
    const[input,setInput] = useState('')

    

    const handleAdd = ()=>{

        let listItem = {
            "id":max+1,
            'entry':input
        }
        setList([...list,listItem])
        setMax(max+1)
        setInput('')
    }

    const handleDelete = (id)=>{

        let filteredArray = list.filter(item => item.id !== id)
        setList(filteredArray)
    }

    const handleInput = (e)=>{
        console.log(e.target.value)
        setInput(e.target.value)
    }

    return(
        <div className='list'>
        <ul>
            {list.map(entry => <ListEntry key={entry.id} entry={entry.entry} id={entry.id} handleDelete={() =>handleDelete(entry.id)}></ListEntry>)}
        </ul>
        <div>
            <input type='text' value={input} onChange={handleInput}></input>
            <button onClick={handleAdd}>Add</button>
        </div>
        </div>
    )
}

export default List