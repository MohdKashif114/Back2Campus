import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    UserName:{
        required:true,
        type:String
    },
    Name:{
        required:true,
        type:String,
    },
    Password:{
        required:true,
        type:String
    },
    Email:{
        required:true,
        type:String
    },
    Batch:{
        required:true,
        type:Number
    },
    Branch:{
        required:true,
        type:String,
    },
    Jobtitle:{
        required:true,
        type:String,
    },
    Location:{
        required:true,
        type:String,
    },
    College:{
        required:true,
        type:String
    }
})

export default mongoose.model("Alumni",userSchema)