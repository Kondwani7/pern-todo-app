const express = require('express')
const app = express();
const cors  = require('cors');
require('dotenv').config()
const pool = require('./db')
const bodyParser = require('body-parser')
const morgan = require('morgan');


app.use(bodyParser.json())
//console.log(process.env.DB_PASSWORD)
//console.log(pool)
//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
PORT = 8000

app.listen(8000, ()=> {
    console.log(`listening  to port:${PORT}`)
})

//ROUTES//
//get all tasks
app.get('/brand_evangelists', async (req, res) => {
    try{
        const allTasks = await pool.query("SELECT * FROM test_brand_evangelists");
        res.json(allTasks.rows);
    }catch(err){
        console.error(err.message)
    }
})
//get a task
app.get('/brand_evangelists/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const task = await pool.query("SELECT * FROM test_brand_evangelists WHERE  brand_evangelist_id= $1",[id])
        res.json(task.rows[0])
    }
    catch(err){
        console.error(err.message)
    }
})
//post/create a task
app.post('/brand_evangelists', async(req,res) => {
    try{
        const {fullname, phone_number, organisation,
             job_position,bank_name, bank_account_number,
             identity_type,bank_branch} = req.body;
        const newTask = await pool.query(
            "INSERT INTO test_brand_evangelists(fullname, phone_number, organisation, \
                job_position, bank_name, bank_account_number, \
                identity_type, bank_branch ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [fullname, phone_number, organisation, job_position, 
            bank_name, bank_account_number, identity_type, bank_branch ]
        )
        res.json(newTask.rows[0]);
    }catch(err){
        console.error(err.message)
    }
})

//update deal_value
app.patch('/brand_evangelists/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const {deal_completed, deal_value, reward}=req.body
        const updateTask = await pool.query(
        "UPDATE test_brand_evangelists SET deal_completed=$1, deal_value=$2, \
         reward = CASE WHEN (deal_value <9999.99) THEN 0 ELSE(deal_value * 0.075) END WHERE brand_evangelist_id = $3",
            [deal_completed, deal_value, id]
        );
        res.json(`
                  Brand evangelist ${id}'s updated. 
                  deal_completed:${deal_completed}
                  deal_value: ${deal_value}`
                );
    }catch(err){
        console.error(err.message);
    }
})




//delete task
app.delete('/brand_evangelists/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const deleteTask =  await pool.query(
            "DELETE FROM test_brand_evangelists where brand_evangelist_id = $1",
            [id]
        )
        res.json("brand_evangelist was deleted");
    }catch(err){
        console.error(err.message);
    }
})