const mongoose=require('mongoose');

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

const User=mongoose.model("User",userSchema);

module.exports=User;