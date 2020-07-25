import React, { useState, useEffect } from 'react'
import './App.css'
import { Navigation } from './Components/Navigation'
import { TasksList } from './Components/TasksList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [tasks, setTasks] = useState([])
  const [searchResult, setSearchResult] = useState([])

  const setAllTasks = (data) => {
    setTasks(data)
    console.log(searchResult)
  }

  const searchResultHandler = (data) => {
    setSearchResult(data)
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
      <Router>
        <Navigation
          setAllTasks={setAllTasks}
          searchResultHandler={searchResultHandler}
        />

        <Switch>
          <Route exact path="/" component={() => <TasksList tasks={tasks} />} />
          <Route
            exact
            path="/search/:keyword"
            component={() => <TasksList tasks={searchResult} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
