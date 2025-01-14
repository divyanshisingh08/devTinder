const express=require("express");
const mongoose= require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    status:{
        type:String,
        enum :{
            values : ["accepted", "rejected", "ignored","interested"],
            message : `{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps:true,
}
)

const connectionRequestModel= new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports={
    connectionRequestSchema
}