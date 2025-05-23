const validator=require("validator");
const validateSignUpData=(req)=>{

    const{firstName,lastName,emailId,password,age,gender}=req.body;

    if(! firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(firstName.length<4 || firstName.length>40){
        throw new Error("First name should be wrong")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password");
    }
    // else if(!age){
    //     throw new Error("Enter age");
    // }
    // else if(!gender){
    //     throw new Error("Enter gender corrrectly");
    // }

}


const validateProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];

  const isEditAllowed=  Object.keys(req.body).every(field=>allowedEditFields.includes(field));

  return isEditAllowed;
}


module.exports={validateSignUpData , validateProfileData};