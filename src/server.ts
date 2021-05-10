import express, { Request, Response, ErrorRequestHandler } from 'express'
const app = express()
const port = 80
const request = require('request')
let Person: { info: string}


app.get('/', (req:Request, res:Response) => {
  request('https://randomuser.me/api/', function (error:ErrorRequestHandler, response:Response, body:Request["body"]) {
    if(!error && response.statusCode == 200) {
      body = JSON.parse(body)
      body.results[0]["jobs"] = "fullstack dev at ssense"
      Person = {
        info: body
      }
      res.send(Person["info"])
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
