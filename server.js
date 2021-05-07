const express = require('express')
const app = express()
const port = 80
const request = require('request')
var person

request('https://randomuser.me/api/', function (error, response, body) {
  if(!error && response.statusCode == 200) {
    person = JSON.parse(body)
    person.results[0]["jobs"] = "fullstack dev at ssense"
  }
})

app.get('/', (req, res) => {
  res.send(person)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
