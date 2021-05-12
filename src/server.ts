import express, { Request, Response, ErrorRequestHandler } from 'express'
import { Person } from './types'
const app = express();
const port = 80;
const request = require('request');

app.get('/', (req:Request, res:Response) => {
  request('https://randomuser.me/api/', function (error:ErrorRequestHandler, response:Response, body:Request["body"]) {
    if(!error && response.statusCode == 200) {
      if(!req.query.field) {
        res.send({});
        return;
      }
      const fields = new Set(String(req.query.field).split(","));

      body = JSON.parse(body);
      const person:Person = body.results[0];
      person["jobs"] = "fullstack dev at sssense";
      for(var k in person) {
        if(!(fields.has(k))) {
          delete person[k as keyof Person];
        }
      }
      res.send(person);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
