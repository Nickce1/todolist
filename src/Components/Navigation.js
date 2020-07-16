import React from 'react'
import { Navbar, Form, FormControl, Button } from 'react-bootstrap'

export const Navigation = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/" className="mr-auto">
        Todo List
      </Navbar.Brand>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
      </Form>
    </Navbar>
  )
}
