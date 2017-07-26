const chalk = require('chalk')
const dotenv = require('dotenv').config()
const db_ip = process.env.DB_HOST,
    db_port = process.env.DB_PORT,
    db_name = process.env.DB_NAME,
    db_user = process.env.DB_USER,
    db_pass = process.env.DB_PASS

let dbFullUrl = 'mongodb://'
const dbUrlWithDBName = `${db_ip}:${db_port}/${db_name}`
const dbUserPwd = `${db_user}:${db_pass}@`

if (!db_user) {
  dbFullUrl += dbUrlWithDBName
} else {
  dbFullUrl += dbUserPwd + dbUrlWithDBName
}

console.log(dbFullUrl)

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(dbFullUrl, (err) => {
  if (err) {
    console.log(chalk.red('Connection failed', err))
  } else {
    console.log(chalk.green(`DB Connected to ${dbFullUrl}`))
  }
})