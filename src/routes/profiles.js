const express=require("express");
const profileRouter=express.Router();
const User=require("../models/user")
profileRouter.use(express.json());
const cookieParser = require('cookie-parser');
profileRouter.use(cookieParser());
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");


profileRouter.get("/profile/view" ,userAuth, async(req,res)=>{
   try{
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