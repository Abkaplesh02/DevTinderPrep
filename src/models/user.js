const mongoose=require('mongoose');
const validator=require("validator")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address", value);
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:10,
        max:100,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
        ,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url", value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true,
});

userSchema.methods.getJWT=async function(){
    const user=this;
            const token=await jwt.sign({_id:user._id},"DEV@Tinder$798",{expiresIn:'1d'});

            return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;

    const passwordHash=user.password;
   const isPasswordValid=bcrypt.compare(passwordInputByUser,passwordHash);

   return isPasswordValid;
}

const User=mongoose.model("User",userSchema);

module.exports=User;