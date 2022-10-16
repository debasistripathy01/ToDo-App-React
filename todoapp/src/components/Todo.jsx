// racfe -----> shirtcut to take the format for the React component

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import { useState } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'


//fetch data 

const FetchTodo = (obj={})=>{

  const {page=1}=obj

  return fetch(`https://calm-badlands-50809.herokuapp.com/api/task?_page=${page}&_limit=5`).then((res)=> res.json())
}

//

//Adding Todos

const addTodos =async(todo)=>{
  return fetch("https://calm-badlands-50809.herokuapp.com/api/task",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(todo)

  }).then((res)=>{
    res.json()
  })
}




// const toggleTodos = (id, newStatus) =>{
//   return fetch("http://localhost:5000/tasks",{
// }

//Toggling the Button from Not DOne to DOne

const toggleTodos =async(id, newStatus)=>{
  return fetch(`https://calm-badlands-50809.herokuapp.com/api/task/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({status:newStatus})

  }).then((res)=>{
    res.json()
  })
}


// Delete Operation 
const DeleteTodos =async(id)=>{
  return fetch(`https://calm-badlands-50809.herokuapp.com/api/task/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  }).then((res)=>{
    res.json()
  })
}

// Adding ToDOs
const Todo = () => {

const[todos, setTodos] = useState([])
const [loading, setLoading] = useState(false)
  
const [page, setPage] = useState(1);


useEffect(()=>{
  handleTodos();
},[page]);


const handleTodos = async() =>{
  setLoading(true)
  return FetchTodo({page}).then((res)=>{
    setLoading(false)
    setTodos(res);
    // console.log(res);

  }).catch((error)=>{
    console.log(error);
    setLoading(false)
  })
}

const handleAdd =(text)=>{
  const Item ={
    title: text,
    status: false,
  };
  setLoading(false)
  addTodos(Item).then((res)=>{
    handleTodos();
    console.log(res);
  })

}

//Toggle Function for Not DONE to DOne status change
const handleToggle = (id, newStatus) =>{
  setLoading(true);
  toggleTodos(id, newStatus).then((res)=>{
    handleTodos()
  }).catch((error)=>{
    setLoading(false);
  })
}


//Delete Function to Delete The Status
const handleDelete = (id) =>{
  setLoading(true);
  DeleteTodos(id).then((res)=>{
    handleTodos()
  }).catch((error)=>{
    setLoading(false);
  })
}

  return (
    <div>
      <div>{loading && "...Loading"}</div>
      <h1>Add To DO</h1>
      <AddTodo handleAdd={handleAdd}/>
      {
        todos.map((item)=>{
          return (<TodoList 
          title={item.title}
          key={item.id}
          status={item.status}
          id={item.id}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          />)
        })
      }
      {/* <TodoList /> */}
      <button onClick={()=>{setPage((prev)=>prev-1)}} disabled={page===1}>Prev</button>
      <button>{page}</button>
      <button onClick={()=>{setPage((prev)=>prev+1)}}>Next</button>
    </div>

  )
}

export default Todo