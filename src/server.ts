import express, { Request, Response, ErrorRequestHandler } from "express";
import { Person } from "./types";
import fetch from "node-fetch";
import _ from "lodash";
export const app = express();
const port = 80;


app.get("/", async (req: Request, res: Response) => {
  const params = getParameters(req);
  const url = getURL(params, req);
  const response = await fetch(url);
  const data = await response.json();
  const person: Person = data.results[0];
  if(!req.query.field || (req.query.field as string).includes("jobs")) {
    person["jobs"] = "fullstack dev at ssense";
    res.send(person);
    return;
  }
  res.send(person);
});

// Get parameters from localhost query string
function getParameters(req: Request) {
  const gender = req.query.gender as string;
  const nat = req.query.nat as string;
  const seed = req.query.seed as string;
  const fields = req.query.field as string;
  const params = new URLSearchParams(
    _.omitBy({ gender: gender, nat: nat, seed: seed, inc: fields }, _.isEmpty)
  );
  return params;
}

// Get randomuserapi URL from parameters specified
function getURL(params: URLSearchParams, req: Request) {
  const url = new URL("https://randomuser.me/api/");
  const queryString = new URLSearchParams(params);
  url.search = new URLSearchParams(queryString).toString();
  return url;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
