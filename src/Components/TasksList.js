import React from 'react'
import { Table } from 'react-bootstrap'

export const TasksList = (props) => {
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
        {props.tasks.map((task) => (
          <tr key={task.t_Id}>
            <td>{task.t_name}</td>
            <td>
              <input type="checkbox" />
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
