const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const config = require("./Config")()
const PORT = config.port;
const Mongo_URL = config.connection_string;
const LoginRouter = require("./Routes/LoginRouter");
const RegisterRouter = require("./Routes/RegisterRouter");
const UserRouter = require("./Routes/UserRouter");
const RefreshRouter = require("./Routes/refreshRouter")

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
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"http://localhost:3001"
}));
app.use("/Register",RegisterRouter);
app.use("/Login",LoginRouter);
app.use("/user",UserRouter);
app.use("/refresh",RefreshRouter);




app.listen(PORT || 4000);
console.log("Listening on port " + PORT);

module.exports = app