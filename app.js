require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const app = express();
const config = require("./Config")()
const PORT = 3000;
const Mongo_URL = "mongodb+srv://Yashwanth:hdWSAavsJtwKyq9L@cluster0.4kaxsmv.mongodb.net/?retryWrites=true&w=majority";
const LoginRouter = require("./Routes/LoginRouter");
const RegisterRouter = require("./Routes/RegisterRouter");

const server = http.createServer(app);

mongoose.connect(Mongo_URL)
        .then(()=>{
            console.log("Succesfully connected to DB")
        })
        .catch((err)=>{
            console.log("err",err);
})

app.get("/",(req,res)=>{
    res.send("Inside Home Page");
})

app.use("/Login",LoginRouter);
app.use("/Register",RegisterRouter);



server.listen(PORT,()=>{
    console.log(`Server is up and Running on ${PORT}`);
});