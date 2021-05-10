import express, { Request, Response, ErrorRequestHandler } from 'express'
const app = express()
const port = 80
const request = require('request')
let Person: {results:[{jobs:string,gender:string,name:{title:string,first:string,last:string},location:{street:
  {number:number,name:string},city:string,state:string,country:string,postcode:number,coordinates:{
    latitude:number,longitude:number},timezone:{offset:number,description:string}},email:string,login:{
      uuid:string,username:string,password:string,salt:string,md5:string,sha1:string,sha256:string},dob:
      {date:string,age:number},registered:{date:string,age:number},phone:string,cell:string,id:
      {name:string,value:string},picture:{large:string,medium:string,thumbnail:string},nat:string}],
      info:{seed:string,results:number,page:number,version:number}}


app.get('/', (req:Request, res:Response) => {
  request('https://randomuser.me/api/', function (error:ErrorRequestHandler, response:Response, body:Request["body"]) {
    if(!error && response.statusCode == 200) {
      body = JSON.parse(body)
       Person = {
        results: [{
          jobs: "fullstack dev at ssense",
          gender: body.results[0]["gender"],
          name: {
            title: body.results[0]["name"]["title"],
            first: body.results[0]["name"]["first"],
            last: body.results[0]["name"]["last"]
          },
          location: {
            street: {
              number: body.results[0]["location"]["street"]["number"],
              name: body.results[0]["location"]["street"]["name"]
            },
            city: body.results[0]["location"]["city"],
            state: body.results[0]["location"]["state"],
            country: body.results[0]["location"]["country"],
            postcode: body.results[0]["location"]["postcode"],
            coordinates: {
              latitude: body.results[0]["location"]["coordinates"]["latitude"],
              longitude: body.results[0]["location"]["coordinates"]["longitude"]
            },
            timezone: {
              offset: body.results[0]["location"]["timezone"]["offset"],
              description: body.results[0]["location"]["timezone"]["description"]
            }
          },
          email: body.results[0]["email"],
          login: {
            uuid: body.results[0]["login"]["uuid"],
            username: body.results[0]["login"]["username"],
            password: body.results[0]["login"]["password"],
            salt: body.results[0]["login"]["salt"],
            md5: body.results[0]["login"]["md5"],
            sha1: body.results[0]["login"]["sha1"],
            sha256: body.results[0]["login"]["sha256"]
          },
          dob: {
            date: body.results[0]["dob"]["date"],
            age: body.results[0]["dob"]["age"]
          },
          registered: {
            date: body.results[0]["registered"]["date"],
            age: body.results[0]["registered"]["date"]
          },
          phone: body.results[0]["phone"],
          cell: body.results[0]["cell"],
          id: {
            name: body.results[0]["id"]["name"],
            value: body.results[0]["id"]["value"]
          },
          picture: {
            large: body.results[0]["picture"]["large"],
            medium: body.results[0]["picture"]["medium"],
            thumbnail: body.results[0]["picture"]["thumbnail"]
          },
          nat: body.results[0]["nat"]
        }],
        info: {
          seed: body["info"]["seed"],
          results: body["info"]["results"],
          page: body["info"]["page"],
          version: body["info"]["version"]
        }
      }
      res.send(Person)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
