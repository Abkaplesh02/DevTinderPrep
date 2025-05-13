const express=require("express");

const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const ConnectionRequest=require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId", userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"Invalid status type"+status
            })
        }


        const toUser=await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({
                message:"User not found"
            })
        }

        // If there is an existing connectionRequest
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId },
                {fromUserId:toUserId,toUserId:fromUserId }
            ]
        })

        if(existingConnectionRequest){
            return res.status(400).json({
                message:"Connection request already exists"
            })
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data =await connectionRequest.save();
        res.json({
            message:req.user.firstName+" is " + status + " in " + toUser.firstName,
            data,
        })
    }
    catch(err){
        res.status(400).send("Error" + err.message)
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const requestId=req.params.requestId;
        const status=req.params.status;

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"Status is not allowed"
            })
        }

        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })

        if(!connectionRequest){
            res.status(400).json({
                message:"Connection request not found"
            })
        }

        connectionRequest.status=status;
        const data=await connectionRequest.save();

        res.json({
            message:"Request"+status,
            data,
        })

        // validate the status
        // validate the requestId
        // Akshay is sending connection request to elon
        // Is Elon is logged in user==toUserId
        // status==interesed
        // 




    }
    catch(err){
        res.status(400).send("Error" + err.message)
    }
})

module.exports=requestRouter;