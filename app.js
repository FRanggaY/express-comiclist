// REST API V 1.0.0 
// Comic List
// Created : 31 December 2021
// Updated : 31 December 2021

const express = require('express')
const app = express()
const comic = require('./routes/comic')
const genre = require('./routes/genre')
const user = require('./routes/user')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cors = require('cors')

const PORT = process.env.PORT || 8000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(PORT, console.log(`Server runs at ${PORT}...`))
    }catch(err){
        console.log(err)
    }
}

//middleware
// app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/comic', comic)
app.use('/api/v1/genre', genre)
app.use('/api/v1/user', user)

app.use(notFound)
app.use(errorHandlerMiddleware)

app.use(cors())

start()