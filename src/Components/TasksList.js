import React from 'react'
import { Table } from 'react-bootstrap'

export const TasksList = ({ tasks, updateTask, searchResultHandler }) => {
  console.log(searchResultHandler)
  const allTasksValueOnSearchUrl = (tasks) => {
    if (tasks.length === 0) {
      const keywords = window.location.href.split('/')[4]

      fetch(`http://localhost:4000/search/${keywords}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          searchResultHandler(response.data)
        })
    }
  }

  allTasksValueOnSearchUrl(tasks)

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
    allTasks = allTasks.map((task) => {
      if (task.t_Id === id) {
        const taskChanged = {
          ...task,
          t_etat: !task.t_etat,
        }

        // Send change to the database
        fetch(`http://localhost:4000/changestate`, {
          method: 'PUT',
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

  const handleDelete = (task_id) => {
    if (window.confirm('Sure to delete this task ? ')) {
      fetch('http://localhost:4000/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: task_id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          const filterTasks = allTasks.filter((task) => task.t_Id !== task_id)
          console.log(response)
          updateTask(filterTasks)
        })
        .catch((error) =>
          console.log(
            `Error when deleting the task id: ${task_id} => ${error}`,
          ),
        )
    }
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
              <button onClick={() => handleDelete(task.t_Id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
