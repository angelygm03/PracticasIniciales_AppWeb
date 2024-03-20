const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require('cors')

const routes= require('./routes')

const app = express()
app.set('port',process.env.PORT||9000)
const dbOptions= {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Sandia2136.',
    database: 'database_cursos'
}

//middleware
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

//routes
app.get('/',(req,res)=>{
    res.send('Welcome to my api')
})

//servidor corriendo
app.listen(app.get('port'),( )=>{
    console.log('server running on port',app.get('port'))
})