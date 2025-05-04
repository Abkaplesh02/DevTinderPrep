const express=require('express');

const app=express();

app.get("/user/:userID/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send("Successfully executed");
})

app.get(/.*fly$/,(req,res)=>{
    res.send("Successfully executed");
})

// app.get("/user",(req,res)=>{
//     res.send({firstName:"Abhishek",lastName:"Kaplesh"})
// })

// app.post("/user",(req,res)=>{
//     console.log("Save data to the database");
//     res.send("Data saved successfully to the database");
// })

// app.delete("/user",(req,res)=>{
//     res.send("Deleted successfully")
// })

// app.use("/test",(req,res)=>{
//     res.send("Hello from the test server");
// })
// This will match all HTTP method api call to /test

// app.use("/hello",(req,res)=>{
//     res.send("Hello from the hello server");
// })

// app.use("/",(req,res)=>{
//     res.send("Hello from the  Abhishek Kaplesh server");
// })


app.listen(7777,()=>{
    console.log("Server started")
});