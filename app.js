require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const app = express();
const config = require("./Config")()
const PORT = config.port;
const Mongo_URL = config.connection_string;
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

app.use(express.json());
app.use("/Login",LoginRouter);
app.use("/Register",RegisterRouter);



server.listen(PORT,()=>{
    console.log(`Server is up and Running on ${PORT}`);
});