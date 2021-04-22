const express = require('express')
const connectDB=require('./config/db')
var cors = require('cors')
const app=express()
const PORT=process.env.PORT || 5000
// connect to db
connectDB()
// initialise middelware to send json data as response
app.use(express.json({ extended: false }))
app.use(cors())

// including routes

// sahil ke route
console.log('sahil ke routes')
app.use('/api/users',require('./routes/user'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/contacts',require('./routes/contacts'))



app.listen(PORT,()=>console.log(`your server is running on port ${PORT}`))