const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest =require("../models/connectionRequest")
const userRouter=express.Router();

// get all the pending connection request for the logged in User
userRouter.get("/user/requests/recieved", userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
        }).populate("fromUserId",["firstName","lastName"])

        res.json({
            message:"data fetched successfully",
            connectionRequests,
        })
    }
    catch(err){
        res.status(400).send("ERROR " + err.message)
    }
})



module.exports=userRouter;