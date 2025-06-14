import React, { useEffect, useState } from 'react'
import { Todoprovider } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItems from './components//TodoItems'
const App = () => {
  const [todos, settodos] = useState([]);

const addTodo=(todo)=>{
settodos((prev)=>[...prev,{id:Date.now(),...todo}])
};

const updatedTodo = (id,todo)=>{
 settodos((prev)=>prev.map((prevTodo)=>(

  prevTodo.id === id ? todo : prevTodo 
 )))
};

const deleteTodo = (id)=>{
  settodos((prev)=>prev.filter((item)=>item.id !== id))
}

const toggleComplete = (id)=>{
   settodos((prev)=>prev.map((prevTodo)=>(
    prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
   )
 
   
   ))
}

// sending query to localStorage to get all the previous todos on page load:

useEffect(()=>{
  // for getting items we only pass key :

const todos =  JSON.parse( localStorage.getItem("todos")||"[]");

  if(todos && todos.length > 0){
    settodos(todos)
  }
},[])

useEffect(()=>{
  // for set items we pass key and value:
  localStorage.setItem("todos",JSON.stringify(todos))
},[todos])

  return (
  <Todoprovider value={{todos,toggleComplete,addTodo,updatedTodo,deleteTodo}}>

     <div className="bg-[#172842] min-h-screen py-8">

                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

                    <div className="mb-4">
                        {/* Todo form goes here */} 
                       <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                         { todos.map((todo)=>(
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItems todo={todo}/>
                          </div>
                         ))}
                    </div>
                </div>
            </div>

  </Todoprovider>
  )
}

export default App
