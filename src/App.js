import React, { useState, useEffect } from 'react'
import './App.css'
import { Navigation } from './Components/Navigation'
import { TasksList } from './Components/TasksList'

function App() {
  const [tasks, setTasks] = useState([])

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
      <Navigation />
      <TasksList tasks={tasks} />
    </div>
  )
}

export default App
