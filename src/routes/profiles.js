const express=require("express");

const profileRouter=express.Router();
const User=require("../models/user")
profileRouter.use(express.json());
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
profileRouter.use(cookieParser());
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");
const authRouter = require("./auth");
const { validateProfileData } = require("../utils/validation");


profileRouter.get("/profile/view", userAuth , async(req,res)=>{
   try{
    const cookies=req.cookies;
    
    const {token}=cookies;
    if(!token){
        throw new Error("Invalid token");
    }

    // validate my token

    const decodedMessage=await jwt.verify(token,"DEV@Tinder$798");
    const{_id}=decodedMessage;
    console.log("The logged in user is ::" + _id);

    const user= await User.findById(_id);
    if(!user){
        throw new Error("User not found / Invalid request");
    }


    const userr=req.user;

    res.send(userr)
   }
   catch(err){
    res.status(400).send(err.message);
   }
})

profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    //validateProfileEdit data
    try{
        if(!validateProfileData(req)){
            throw new Error("Invalild edit request");
        }
        
        const loggedInUser=req.user;
        // user cocmming from auth middleware

        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

        await loggedInUser.save();
        res.json({message : `${loggedInUser.firstName} ,profile updated successfulyy!!`,data:loggedInUser});

    }
    catch(err){
        res.status(400).send("Not able to send response" + err.message)
    }
})




module.exports=profileRouter;