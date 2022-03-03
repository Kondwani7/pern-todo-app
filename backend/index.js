const express = require('express')
const app = express();
const cors  = require('cors');
require('dotenv').config()
const pool = require('./db')

//console.log(process.env.DB_PASSWORD)
console.log(pool)
//middleware
app.use(cors())
app.use(express.json())

PORT = 8000

app.listen(8000, ()=> {
    console.log(`listening  to port:${PORT}`)
})

//ROUTES//
//get all tasks
app.get('/tasks', (req, res) => {
    
})
//get a task
app.get('/tasks/:id', (req, res) => {
    res.send(req.body)
})
//create a task
app.post('/tasks', async(req,res) => {
    try{
        const {description} = req.body;
        const newTask = await pool.query(
            "INSERT INTO tasks(description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(newTask.rows[0]);
    }catch(err){
        console.log(err.message)
    }
})

//update task

//delete task