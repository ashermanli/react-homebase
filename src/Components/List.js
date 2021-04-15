import React,{useState} from 'react'
import ListEntry from './ListEntry'

const List = ({handleNotification})=>{

    const[list,setList] = useState([])
    const[max, setMax] = useState(0)
    const[input,setInput] = useState('Add an Entry')

    

    const handleAdd = ()=>{

        if(input === ''){
            handleEmpty()
            return
        }

        let listItem = {
            "id":max+1,
            'entry':input
        }
        setList([...list,listItem])
        setMax(max+1)
        setInput('')
        handleSuccess('Successfully added')
    }

    const handleDelete = (id)=>{

        let filteredArray = list.filter(item => item.id !== id)
        setList(filteredArray)

        if(filteredArray.length === 0){
            setMax(0)
            setInput('Add an entry')
        }

        handleSuccess('Successfully deleted')
    }

    const handleInput = (e)=>{
        console.log(e.target.value)
        setInput(e.target.value)
    }

    const handleInputClick = ()=>{
        setInput('')
    }

    const handleSuccess = (message)=>{
        const noti={
            'notification': message
        }

        handleNotification(noti)
    }

    const handleEmpty = ()=>{
        const noti= {
            'error':'Please input some text'
        }
        handleNotification(noti)
    }

    const noti={
        'notification': 'Please input some text'
    }
    
    return(
        <div className={list.length >0 ? 'list': 'empty-list'}>
        <ul>
            {list.map(entry => <ListEntry key={entry.id} entry={entry.entry} id={entry.id} handleDelete={() =>handleDelete(entry.id)}></ListEntry>)}
        </ul>
        <div className='input-block'>
            <input type='text' value={input} onClick={handleInputClick} onChange={handleInput}></input>
            <button onClick={handleAdd}>Add</button>
        </div>
        </div>
    )

}

export default List