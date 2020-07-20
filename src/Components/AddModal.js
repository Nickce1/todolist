import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export const AddModal = (props) => {
  const [task, setTask] = useState({
    t_name: '',
    t_etat: false,
  })

  const handleSubmitAddTask = (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/addTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((response) => {
        props.setAllTasks(response.data)
      })
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitAddTask}>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New Task: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={task.t_name}
                onChange={(e) => setTask({ ...task, t_name: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
