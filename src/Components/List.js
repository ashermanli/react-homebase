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
      'id':max+1,
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

    
  return(
    <div className='border-2 border-red-500 w-4/5 h-auto flex flex-col items-center my-5'>
      <ul className='w-full p-2 flex flex-col items-center space-y-2'>
        {list.map(entry => <ListEntry key={entry.id} entry={entry.entry} id={entry.id} handleDelete={() =>handleDelete(entry.id)}></ListEntry>)}
      </ul>
      <div className='input-block'>
        <input className='bg-black m-2 border-2 border-red-500' type='text' value={input} onClick={handleInputClick} onChange={handleInput}></input>
        <button className='w-16 border-2 border-red-500' onClick={handleAdd}>Add</button>
      </div>
    </div>
  )

}


export default List