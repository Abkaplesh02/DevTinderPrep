const express=require('express');

const app=express();

// app.use("/route" , rH,rH2,rH3,rH4,rH5) 
// We can add as many route handler we want , We can send route handler in any way ..........whether some of them in array , or all of them in array , or no one in array .........still works same in all cases

app.use("/user",
    [(req,res,next)=>{
    // Route handler
    // res.send("Route handler 1");
    console.log("Handling route handler 1")
    next();
    // This next functon is given to us by express js . Expressjs says that whenever a request will come , request will come and response object will be passed on to function and next is passed into function as 3rd arguement and if we call next function it will call next route handler.
}, 
(req,res,next)=>{
    console.log("Handling route handler 2");
    // res.send("Route handler 2")
    next();
}],
(req,res,next)=>{
    console.log("3rd Route handler");
    // res.send("3rd rote handler")
    next();
},
(req,res,next)=>{
    console.log("4th route handler")
    res.send("4th log handler");
    next();
})

// This will send error becasue we cannot send 2 response to one api call 
// Single route can have multiple route handlers






































// app.get("/user/:userID/:name/:password",(req,res)=>{
//     console.log(req.params)
//     res.send("Successfully executed");
// })

// app.get(/.*fly$/,(req,res)=>{
//     res.send("Successfully executed");
// })

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