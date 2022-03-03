const express = require('express')
const app = express();
const cors  = require('cors');
require('dotenv').config()
const pool = require('./db')

//console.log(process.env.DB_PASSWORD)
//console.log(pool)
//middleware
app.use(cors())
app.use(express.json())

PORT = 8000

app.listen(8000, ()=> {
    console.log(`listening  to port:${PORT}`)
})

//ROUTES//
//get all tasks
app.get('/tasks', async (req, res) => {
    try{
        const allTasks = await pool.query("SELECT * FROM tasks");
        res.json(allTasks.rows);
    }catch(err){
        console.log(err.message)
    }
})
//get a task
app.get('/tasks/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const task = await pool.query("SELECT * FROM tasks WHERE task_id= $1",[id])
        res.json(task.rows[0])
    }
    catch(err){
        console.log(err.message)
    }
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
app.patch('/tasks/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const {description} =req.body;
        const updateTodo = await pool.query(
        "UPDATE tasks SET description = $1 WHERE task_id = $2",
            [description, id]
        );
        res.json("Task was updated");
    }catch(err){
        console.log(err.message);
    }
})
//delete task
app.delete('/tasks/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const deleteTask =  await pool.query(
            "DELETE FROM tasks where task_id = $1",
            [id]
        )
        res.json("Task was deleted");
    }catch(err){
        console.log(err.message);
    }
})