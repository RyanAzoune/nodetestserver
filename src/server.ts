import express, { Request, Response, ErrorRequestHandler } from 'express'
import { Person } from './types'
const app = express()
const port = 80
const request = require('request')


app.get('/', (req:Request, res:Response) => {
  request('https://randomuser.me/api/', function (error:ErrorRequestHandler, response:Response, body:Request["body"]) {
    if(!error && response.statusCode == 200) {
      body = JSON.parse(body)
      const Person = body
      res.send(Person)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
