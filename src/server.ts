import express, { Request, Response, ErrorRequestHandler } from 'express'
import { Person } from './types'
const app = express();
const port = 80;
const request = require('request');
const _ = require('lodash')

app.get('/', (req:Request, res:Response) => {
  request('https://randomuser.me/api/', function (error:ErrorRequestHandler, response:Response, body:Request["body"]) {
    if(!error && response.statusCode == 200) {
      body = JSON.parse(body);
      const person:Person = body.results[0];
      person["jobs"] = "fullstack dev at sssense";
      if(!req.query.field) {
        res.send(person);
        return;
      }
      const fields = (req.query.field as string).split(",");
      const filtered = _.pick(person, fields);
      res.send(filtered);
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
