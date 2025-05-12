const express=require("express");

const authRouter=express.Router();
const profileRouter=express.Router();
const User=require("../models/user")
authRouter.use(express.json());
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
authRouter.use(cookieParser());
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth")
const {validateSignUpData}=require("../utils/validation")




authRouter.post("/signup",async (req,res)=>{

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


authRouter.post("/Login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        // Write a check for email and password validation here
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Email Id is not present in DB");
        }
        const isPasswordValid=await user.validatePassword(password);

        if(isPasswordValid){

            // Create a JWT Token

           const token=await user.getJWT();

            // Add the token to cookie and send the response back to server

            res.cookie("token",token,{expires:new Date(Date.now()+900000)});
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


authRouter.post("/Logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send();
})

module.exports=authRouter;