const express = require('express')
const app = express()
const port = 80
const request = require('request')


app.get('/', (req, res) => {
  request('https://randomuser.me/api/', function (error, response, body) {
    if(!error && response.statusCode == 200) {
      body = JSON.parse(body)
      body.results[0]["jobs"] = "fullstack dev at ssense"
      const person = body
      res.send(person)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
