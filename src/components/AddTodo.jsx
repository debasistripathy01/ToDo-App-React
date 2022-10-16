
import React from 'react'
import { useState } from 'react'

const AddTodo = ( {handleAdd} ) => {
    const [text, setText] = useState("")

    const handleChange = (e) =>{
        setText(e.target.value);
    }

    const handleSubmit =()=>{
        handleAdd(text)
    }

    console.log(text)
  return (
    <div>
        <input 
        type="text" 
        placeholder='write something...' 
        onChange={handleChange} 
        
        />
        <button onClick={handleSubmit}>ADD</button>
    </div>
  )
}

export default AddTodo