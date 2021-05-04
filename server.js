const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
    var d = new Date()
    var time = "Time: " + d.getHours() + ':' + d.getMinutes()
  res.send(time)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})