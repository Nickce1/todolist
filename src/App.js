import React, { useState, useEffect } from 'react'
import './App.css'
import { Navigation } from './Components/Navigation'
import { TasksList } from './Components/TasksList'

function App() {
  const [tasks, setTasks] = useState([])

  const setAllTasks = (data) => {
    setTasks(data)
  }

  const getAlltasks = () => {
    fetch('http://localhost:4000')
      .then((response) => response.json())
      .then((response) => {
        setTasks(response.data)
      })
  }

  useEffect(() => {
    getAlltasks()
  }, [])

  return (
    <div className="App">
      <Navigation setAllTasks={setAllTasks} />
      <TasksList tasks={tasks} />
    </div>
  )
}

export default App
