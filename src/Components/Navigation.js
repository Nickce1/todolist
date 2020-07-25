import React, { useState } from 'react'
import { Navbar, Form, FormControl, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { AddModal } from './AddModal'

export const Navigation = ({ setAllTasks, searchResultHandler }) => {
  const [show, setShow] = useState(false)
  const history = useHistory()

  const { register, handleSubmit } = useForm()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onSubmit = (data) => {
    fetch(`http://localhost:4000/search/${data.keywordSearch}`)
      .then((response) => response.json())
      .then((response) => {
        searchResultHandler(response.data)
        history.push(`/search/${data.keywordSearch}`)
      })
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/" className="mr-auto">
          Todo List
        </Navbar.Brand>
        <Form inline onSubmit={handleSubmit(onSubmit)}>
          <Button variant="primary" onClick={handleShow} className="mr-2">
            Add Task
          </Button>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            name="keywordSearch"
            ref={register}
          />
          <Button variant="outline-primary" type="submit">
            Search
          </Button>
        </Form>
      </Navbar>
      <AddModal
        handleClose={handleClose}
        show={show}
        setAllTasks={setAllTasks}
      />
    </>
  )
}
