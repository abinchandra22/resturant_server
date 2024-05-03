// lodes .env file to and content in to process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router/router')
require('./DB/connectionString')


// creating express server
const restServer = express()

// use cores to allow share data
restServer.use(cors())


// json parse after cors and before router
restServer.use(express.json())

// sent file to other app
restServer.use('/uploades',express.static('./uploades'))

// route use only after cors
restServer.use(router)

// hosting server to port
const PORT = 3000 || process.env.PORT

restServer.listen(PORT, () => {
    console.log(`Resturant server starter at port ${PORT}`);
})

// to resolve http get request
restServer.get('/', (req, res) => {
    res.send("<h1>Resturant server starter</h1>")
})

