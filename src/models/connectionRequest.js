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
//Compound Index , 1 means ascending , -1 means descending
connectionRequestSchema.index({fromUserId:1, toUserId:1 })


connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;


    //check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself !")
    }
    next();
})
const connectionRequestModel= new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports={
    connectionRequestModel
}

