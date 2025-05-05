const mongoose=require('mongoose');



const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://abkaplesh02:bGJaOz00HSPFE8n7@cluster0.0lhui.mongodb.net/devTinder")
    }

    module.exports=connectDB;

    