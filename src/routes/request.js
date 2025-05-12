const express=require("express");

const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth,async(req,res)=>{

    const user=req.user;
    // Sending connection request
    
    res.send(user.firstName  + " is sending Connection ")
})

module.exports=requestRouter;