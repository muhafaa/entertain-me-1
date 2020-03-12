const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json(err)
})

app.listen(PORT, () => {
  console.log('Orchestrator: Listen on port: ' + PORT)
})
