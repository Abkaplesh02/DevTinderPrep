const jwt=require("jsonwebtoken");
const User=require("../models/user")

const userAuth=async(req,res,next)=>{
    // Read the token from the req cookies

    try{

        
        const { token }=req.cookies;
        

        if(!token){
           return res.status(401).send("Please login")
        }
        
        const decodedMessage=await jwt.verify(token,"DEV@Tinder$798");
        
        const {_id}=decodedMessage;
        
        const user=await User.findById(_id);
        
        if(!user){
            throw new Error("User not found");
        }
        req.user=user;
        next();
        // Validate the token
    }
    catch(err){
        res.status(400).send(err.message);
    }

    // Find the user
};


module.exports={userAuth};









// const adminAuth=(req,res,next)=>{
//     console.log("Admin auth is getting checked")
//     const token="xyza";
//     const isAdminAuthorised=token==="xyz";
//     if(!isAdminAuthorised){
//         res.status(401).send("The admin is not authorised");
//     }
//     else{
//         next();
//     }
// }


// const userAuth=(req,res,next)=>{
//     console.log("user auth is getting checked")
//     const token="xyza";
//     const isAdminAuthorised=token==="xyz";
//     if(!isAdminAuthorised){
//         res.status(401).send("The user is not authorised");
//     }
//     else{
//         next();
//     }
// }
// module.exports={adminAuth,userAuth};