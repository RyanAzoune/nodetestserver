import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import { app } from '../src/server'

chai.should();
chai.use(chaiHttp);

describe("Server API", () => {
    
    // Case where we have no fields or parameters specified
    it("should GET /", async function() {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a("object"); // Person doesn't work but res.send sends a Person object ??
        expect(res.body).to.have.all.keys("jobs", "cell", "dob", "email", "gender", "id", "location", "login", 
         "name", "nat", "phone", "picture", "registered");
    })

    // Case where we have fields specified but no parameters
    it("should GET /?field=jobs,email,gender,location", async function() {
        const res = await request(app).get('/?field=jobs,email,gender,location');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.keys("jobs", "email", "gender", "location");
        expect(res.body).to.not.have.keys("cell", "dob", "id", "login", 
        "name", "nat", "phone", "picture", "registered");
    })

    // Case where we have parameters but no fields
    it("should GET /?gender=female", async function() {
        const res = await request(app).get('/?gender=female');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.all.keys("jobs", "cell", "dob", "email", "gender", "id", "location", "login", 
        "name", "nat", "phone", "picture", "registered");
        expect(res.body).to.include({gender: 'female'});
    })

    // Case where we have parameters and fields
    it("should GET ?field=jobs,email,gender,location&gender=female", async function() {
        const res = await request(app).get('/?field=jobs,email,gender,location&gender=female');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.all.keys("jobs", "email", "gender", "location");
        expect(res.body).to.include({gender: 'female'});
        expect(res.body).to.not.have.keys("cell", "dob", "id", "login", 
        "name", "nat", "phone", "picture", "registered");
    })
})