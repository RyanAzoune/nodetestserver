import express, { Request, Response, ErrorRequestHandler } from 'express'
import { Person } from './types'
const app = express();
const port = 80;
const request = require('request');

app.get('/', (req:Request, res:Response) => {
  var baseURL = 'https://randomuser.me/api/?'
  const gender = req.query.gender
  const nat = req.query.nat
  const seed = req.query.seed
  if(gender != undefined) 
  {
    baseURL += "gender=" + gender + "&";
  }
  if(nat != undefined)
  {
    baseURL += "nat=" + nat + "&";
  }
  if(seed != undefined)
  {
    baseURL += "seed=" + seed + "&";
  }
  request(baseURL, function (error:ErrorRequestHandler, response:Response, body:Request["body"]) {
    if(!error && response.statusCode == 200) {
      console.log(baseURL);
      body = JSON.parse(body);
      const person:Person = body.results[0];
      person["jobs"] = "fullstack dev at sssense";

      if(!req.query.field) {
        res.send(person);
        return;
      }
<<<<<<< Updated upstream

      const fields = new Set(String(req.query.field).split(","));

      for(var k in person) {
        if(!(fields.has(k))) {
          delete person[k as keyof Person];
        }
      }
      res.send(person);
=======
      const fields = String(req.query.field).split(",");
      const filtered = _.pick(person, fields);
      console.log(filtered)
      res.send(filtered);
>>>>>>> Stashed changes
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
