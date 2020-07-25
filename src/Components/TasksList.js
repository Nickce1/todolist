import React from 'react'
import { Table } from 'react-bootstrap'

export const TasksList = ({ tasks, updateTask }) => {
  let allTasks = [...tasks]

  const nameCSS = (task) => {
    if (task.t_etat) {
      return {
        textDecoration: 'line-through',
        color: 'darkgray',
      }
    } else return {}
  }

  const handleToggleComplete = (id) => {
    // Modify list
    console.log('allTasks at the begining:')
    allTasks = allTasks.map((task) => {
      if (task.t_Id === id) {
        const taskChanged = {
          ...task,
          t_etat: !task.t_etat,
        }

        // Send change to the database
        fetch(`http://localhost:4000/changestate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskChanged),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            console.log(updateTask)
            updateTask(allTasks)
          })
          .catch((error) => console.log(`Error when modifying state: ${error}`))
        return taskChanged
      }
      return task
    })
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Task name</th>
          <th>State</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allTasks.map((task) => (
          <tr key={task.t_Id}>
            <td style={nameCSS(task)}>{task.t_name}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={task.t_etat}
                onClick={() => handleToggleComplete(task.t_Id)}
              />
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
