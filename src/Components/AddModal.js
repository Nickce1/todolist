import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export const AddModal = (props) => {
  const handleSubmitAddTask = (e) => {
    e.preventDefault()
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
              <Form.Control type="text" placeholder="Enter task name" />
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
