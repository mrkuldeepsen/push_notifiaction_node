const express = require('express')
const app = express()
const path = require('path')
const connectDb = require('./config/database.js')
require('dotenv').config()
const userRoute = require('./routes/user')
const {responceTime} = require('./middlewares/apiResponseTime.js')
const responseTime = require('response-time')

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(responceTime)

app.use('/user',userRoute)
    
const PORT = process.env.PORT
app.listen(PORT, () => {
   console.log(`app is working on port: ${PORT}`)
})
