const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controller/blogs')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')

const app = express()

app.use(cors())
app.use(express.json())


mongoose.set('strictQuery',false)

const MONGODB_URL = config.MONGODB_URL
const PORT = config.PORT



mongoose.connect(MONGODB_URL)
.then(()=>logger.info('database connection succeeded'))
.catch(error=> logger.error(error))


app.use('/api/blogs',blogRouter)

module.exports = app