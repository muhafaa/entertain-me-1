const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const client = require('./services/mongodb')
const dbName = 'entertain_me'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  client.connect(function(err) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      console.log('Connected, db name : ' + dbName)
      req.db = client.db(dbName)
      next()
    }
  })
})

app.use(router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Movies: Listen on port: ' + PORT)
})
