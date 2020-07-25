const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const connexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'todo',
  password: 'asdcxz1+',
})

connexion.connect((error) => {
  if (error) {
    console.log('CANNOT CONNECT TO THE DATABASE...')
    console.log(error)
  } else console.log('CONNECTED TO THE DATABASE')
})

const QUERY_GET_ALL_TASKS = 'SELECT * FROM task;'

const getAllTasks = (res) => {
  connexion.query(QUERY_GET_ALL_TASKS, (err, result) => {
    if (err) {
      console.log('QUERY ALL TASKS ERROR:')
      console.log(err)
    } else {
      res.json({
        data: result,
      })
    }
  })
}

app.get('/', (req, res) => {
  getAllTasks(res)
})

app.post('/addTask', (req, res) => {
  const QUERY_ADD_TASK = `
    INSERT INTO task (
      t_name,
      t_etat
    )
    VALUES (
      '${req.body.t_name}',
      ${req.body.t_etat}
    );
    `
  connexion.query(QUERY_ADD_TASK, (error, results) => {
    if (error) {
      console.log('QUERY ADD TASK ERROR:')
      console.log(error)
    } else {
      getAllTasks(res)
    }
  })
})

app.get('/search/:keywords', (req, res) => {
  const QUERY_SEARCH = `SELECT * FROM task WHERE t_name LIKE '%${req.params.keywords}%'`

  connexion.query(QUERY_SEARCH, (error, results) => {
    if (error) {
      console.log('SEARCH QUERY ERROR:')
      console.log(error)
    } else {
      res.json({
        data: results,
      })
    }
  })
})

app.post('/changestate', (req, res) => {
  const QUERY_CHANGE_STATE = `UPDATE task SET t_etat = ${req.body.t_etat} WHERE t_Id = ${req.body.t_Id}`
  connexion.query(QUERY_CHANGE_STATE, (error, result) => {
    if (error) {
      console.log('Update change state error: ')
      console.log(error)
    } else
      res.send({
        stateChange: 'Successful',
        side: 'Database',
      })
  })
})

app.listen(4000, () => console.log('Listen to port 4000...'))
