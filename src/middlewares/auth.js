const adminAuth=(req,res,next)=>{
    console.log("Admin auth is getting checked")
    const token="xyza";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("The admin is not authorised");
    }
    else{
        next();
    }
}


const userAuth=(req,res,next)=>{
    console.log("user auth is getting checked")
    const token="xyza";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("The user is not authorised");
    }
    else{
        next();
    }
}
module.exports={adminAuth,userAuth};