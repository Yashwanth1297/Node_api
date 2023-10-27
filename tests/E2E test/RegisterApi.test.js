const chai = require("chai");
const {expect} = chai;
const {describe,it} = require('mocha');
const app = require("../../app");
let chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe("Register controller", () =>{
    it("should return status 201 and message user created in the db", (done) =>{
        const user = {
            'fname':'shiva',
            'lname' : 'thota',
            'email':'shiva1@gmail.com',
            'password':'12345',
        }

        chai
        .request(app)
        .post("/Register")
        .send(user)
        .end((err,res) =>{
            expect(res.status).equals(201);
            // expect(res.body).to.have.property('msg').that.equals("User Created in the db");
            done();
        })
    })


    it("should return status 500 ", (done) =>{
        const invalidUser ={
            'fname':'sai',
            'lname':'Yash',
        }

        chai
        .request(app)
        .post("/Register")
        .send(invalidUser)
        .end((err,res) =>{
            expect(res).to.have.status(500);
            done();
        })
    })
})

