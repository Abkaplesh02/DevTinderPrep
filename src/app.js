const express=require('express');

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello from the test server");
})

app.use("/hello",(req,res)=>{
    res.send("Hello from the hello server");
})

app.use("/",(req,res)=>{
    res.send("Hello from the server");
})


app.listen(7777,()=>{
    console.log("Server started")
});