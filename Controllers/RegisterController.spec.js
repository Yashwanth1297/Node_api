const { Register } = require("./RegisterController");
const chai = require("chai");
const sinon = require("sinon");
const {expect} = chai;
const {describe,it} = require('mocha');

describe("Register",() =>{
    it("should create a user in db",async () =>{
        req ={
            'fname':'john',
            'lname':'legend',
            'email':'john.legend@gmail.com',
            'password':'123456'
        }

        res ={
            status:(statuscode) =>{
                expect(statuscode).to.equal(201)
            },
            json:(response) =>{
                expect(response).deep.to.equal({msg:"User Created in the db"})
            }
        }

        const genSaltStub = sinon.stub(bcrypt,"genSalt").resolves("")
        const hashedStub = sinon.stub(bcrypt,"hash").resolves("")
        const userStub = sinon.stub(user,"create").resolves({})

        await Register(req,res);
        expect(genSaltStub.calledOnce).to.be.true;
        expect(hashedStub.calledOnce).to.be.true;
        expect(userStub.calledOnce).to.be.true;


        genSaltStub.restore();
        hashedStub.restore();
        userStub.restore();

    })

    it("should return error", async() =>{
        req = {
            'fname':'john',
            'lname':'legend',
            'email':'john.legend@gmail.com',
            'password':'123456'
        }

        res ={
            status: (statuscode) =>{
                expect(statuscode).to.equals(500);
            },
            send: (msg) =>{
                expect(msg).to.equals("Internal Server error")
            }
        }

        
        const genSaltStub = sinon.stub(bcrypt,"genSalt").throws()
        const hashedStub = sinon.stub(bcrypt,"hash").throws("")
        const userStub = sinon.stub(user,"create").throws({})

        await Register(req,res);

        expect(genSaltStub.CalledOnce).to.be.true;
        expect(hashedStub.CalledOnce).to.be.true;
        expect(userStub.CalledOnce).to.be.true;

        genSaltStub.restore();
        hashedStub.restore();
        userStub.restore();

    })
})