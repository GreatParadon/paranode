const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk')
const dotenv = require('dotenv').config()

app = express()
app.set('port', process.env.PORT)

// Connect Database
require('./config/database.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use(morgan('dev'))

// Define Route
// routeImport

// Server connect
const port = app.get('port')
app.listen(port, () => {
  console.log(chalk.green(`Server started on port ${port}`))
})

module.exports = app