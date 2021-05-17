import express, { Request, Response, ErrorRequestHandler } from 'express';
import { Person } from './types';
import fetch from 'node-fetch';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import _ from 'lodash';
const app = express();
const port = 80;


app.get('/', async (req:Request, res:Response) => {
  const params = new URLSearchParams(omitBy({ gender: req.query.gender, nat: req.query.nat, seed: req.query.seed }, isEmpty));
  const url = new URL('https://randomuser.me/api/');
  url.search = new URLSearchParams(params).toString();
  const response = await fetch(url);
  const data = await response.json();
  const person:Person = data.results[0];
  person["jobs"] = "fullstack dev at ssense";
  var filtered;
  if(!req.query.field) {
   filtered = person;
  } else {
    const fields = (req.query.field as string).split(',');
    filtered = _.pick(person, fields);
  }
  res.send(filtered);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
