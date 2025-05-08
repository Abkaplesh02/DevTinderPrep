const express=require('express');

const connectDB=require("./config/database");
const app=express();
const User=require("./models/user")
const {validateSignUpData}=require("./utils/validation")
app.use(express.json());
const bcrypt=require('bcrypt');

app.post("/signup",async (req,res)=>{

    try{

    //Validation of data
    validateSignUpData(req);

    const {firstName,lastName,emailId,password}=req.body;
    // Encrypt the password
    const passwordHash=await bcrypt.hash(password,10);
    // Creating a new instance of the user model
    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });
    // Creating a new instance of the user model

        await user.save();
    res.send("User Added successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user"+ err.message);
    }
})

app.post("/Login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        // Write a check for email and password validation here
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Email Id is not present in DB");
        }
        const isPasswordValid=bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.send("Login successfull!!");
        }
        else{
            throw new Error("Password is not correct ");
        }
    }
    catch(err){
        res.status(400).send("Not found :",err.message);
    }
})

// Feed api :: get/feed - get all the users from the database
app.get("/user",async(req,res)=>{
    const userPassword=req.body.password;
try{

   const user=await User.find({password:userPassword})
   if(user.length===0){
    res.status(404).send("User not found");
   }
   else{

       res.send(user);
    }
}
catch(err){
    res.status(400).send("something went wrong");
}
})
// Get user by email
app.get("/Feed",async(req,res)=>{

    try{
        const user=await User.find({});
        res.send(user);
    }
    catch(err){
        res.status(400).send("Nothing running")
    }

})

app.get("/find",async(req,res)=>{
    const userPassword=req.body.password;
    
        const user=await User.findOne({password:userPassword});
        if(!user){
            res.status(400).send("Ntohingn found")
        }
        else{

            res.send(user);
        }
})

// Delete the user from database
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        // const user=await User.findByIdAndDelete(userId)
        const user=await User.findByIdAndDelete({_id:userId})
        res.send("user deleted");
    }
    catch(err){
        res.status(400).send("Nothing running")
    }

})

// Update the data
app.patch("/user/:userID",async(req,res)=>{
    const userId=req.params.userID;
    const data=req.body;
    const ALLOWED_UPDATES=[
        "photoUrl","about","gender","age","skills"
    ]

    try{ 
    const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k))

    if(!isUpdateAllowed){
        throw new Error("Update nto allowed");
    }

    if(data?.skills.length>10){
        throw new Error("Skills cannot be more than 10")
    }
    
        const user=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:'after',runValidators:true},);
        console.log(user)
        res.send("Data sent successfully")
    }
    catch(err){
        res.status(400).send("Nothing running")
    }
    

})

connectDB().then(()=>{
    console.log("DataBase connection established")
    app.listen(7777,()=>{
        console.log("Server started")
    });
}).catch((err)=>{
    console.error("Database cannot be connected")
})












// const {adminAuth,userAuth}=require("./middlewares/auth")


// app.get("/getUserData",(req,res)=>{

//     try{
//  // Loigic of DB call and get user data
//  throw new Error("fdsadasf");
//  res.send("User Data Sent");
//     }
//     catch(err){
//         res.status(500).send("Something went very wrong");
//     }

   
// })

// app.use("/",(err,req,res,next)=>{
//     if(err){
//         // Log your error message
//         res.status(500).send("something went wrong");
//     }
//     else {
//         res.send("Take your data");
//     }
// })




















// // Handle auth middleware for all requests :: GET , Post

// app.use("/admin",adminAuth);
// // app.use("/user",userAuthAuth);

// app.get("/admin/getAllData",(req,res)=>{
//     // Logic of checking if the request is authorised
//     // Check if the request is authenticated:: actually made by admin
//     // const token="xyz";
//     // const isAdminAuthorised=token==="xyza"
//     // if(isAdminAuthorised){
//     //     res.send("All Data sent");
//     // }
//     // else{
//     //     res.status(401).send("The admin is not authorised");
//     // }
//     res.send("All Data send")
// })

// app.get("/user", userAuth , (req,res)=>{
//     res.send("User data sent");
// })

// app.post("/user/login",(req,res)=>{
//     res.send("User logged in successfully!!")
// })

// app.get("/admin/deleteUser",(req,res)=>{

//     res.send("Deleted a user");
// })











































// GET /users=>it check all the app.xxx("matching route") functions  =>middleware chain =>request handler

// app.use("/",(req,res,next)=>{
//     console.log("First ")
//     next();
//     // res.send("Found one!!!");
    
// })

// app.get("/user",(req,res)=>{
//     console.log("Second one")
// res.send("This is real one ")
// })

















// app.get("/user",(req,res,next)=>{
//     console.log("This is second route handler")
//     // res.send("2nd Route handler");
//     next();
// })

// app.get("/user",(req,res,next)=>{
//     console.log("This is first route handler")
//         next();
    
// })



























// app.use("/route" , rH,rH2,rH3,rH4,rH5) 
// We can add as many route handler we want , We can send route handler in any way ..........whether some of them in array , or all of them in array , or no one in array .........still works same in all cases

// app.use("/user",
//     [(req,res,next)=>{
//     // Route handler
//     // res.send("Route handler 1");
//     console.log("Handling route handler 1")
//     next();
//     // This next functon is given to us by express js . Expressjs says that whenever a request will come , request will come and response object will be passed on to function and next is passed into function as 3rd arguement and if we call next function it will call next route handler.
// }, 
// (req,res,next)=>{
//     console.log("Handling route handler 2");
//     // res.send("Route handler 2")
//     next();
// }],
// (req,res,next)=>{
//     console.log("3rd Route handler");
//     // res.send("3rd rote handler")
//     next();
// },
// (req,res,next)=>{
//     console.log("4th route handler")
//     res.send("4th log handler");
//     next();
// })

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


