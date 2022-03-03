const express = require('express')
const app = express();
const cors  = require('cors');
require('dotenv').config
//middleware
app.use(cors())
app.use(express.json())

PORT = 3000

app.listen(3000, ()=> {
    console.log(`listening  to port:${PORT}`)
})