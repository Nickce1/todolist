import React, { useState } from 'react'
import { Navbar, Form, FormControl, Button } from 'react-bootstrap'

import { AddModal } from './AddModal'

export const Navigation = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/" className="mr-auto">
          Todo List
        </Navbar.Brand>
        <Form inline>
          <Button variant="primary" onClick={handleShow} className="mr-2">
            Add Task
          </Button>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
      <AddModal handleClose={handleClose} show={show} />
    </>
  )
}
