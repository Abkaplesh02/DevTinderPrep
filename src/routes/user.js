const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest =require("../models/connectionRequest");
const User = require("../models/user");
const userRouter=express.Router();

const USER_SAFE_DATA="firstName lastName age about skills gender";

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


// Connections api
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        const data=connectionRequests.map((row)=>{ 
            if(row.fromUserId._id.toString()==loggedInUser._id.toString()){
                return row.toUserId;
            }
             return row.fromUserId
        })
        res.json({data});
    }
    catch(err){
        res.status(400).send("Error "+err.message );
    }
})


// feed APi

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        // User should see all the user cards except
        // his own card
        // his connections
        // rejected connections
        //ignored connections
        // already sent the connection request
        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50 ? 50 :limit;
        const skip=(page-1)*limit;

        const loggedInUser=req.user;
        

        // Find all connection request
      const connectionRequest=await ConnectionRequest.find({
        $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
      }).select("fromUserId toUserId"); //.populate("fromUserId","firstName").populate("toUserId","firstName");

      const hideUsersFromFeed=new Set();
      connectionRequest.forEach(req=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
      })
      
      const users=await User.find({
        $and:[ 

            {_id: { $nin: Array.from(hideUsersFromFeed)}},
            {_id: { $ne: loggedInUser._id}},
        ]
      }).select(USER_SAFE_DATA).skip(skip).limit(limit);


      res.send(users);

    }
    catch(err){
        res.status(400).send("error "+err.message)
    }
})


module.exports=userRouter;