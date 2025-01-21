const express=require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest");

const userRouter=express.Router();

//get all the connection request received by the logged in user
userRouter.get("/user/request/recieved",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequests= await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        })
        req.json({
            message:" Here are users interested in you",
            data: connectionRequests
        })
    }
    catch(err){
        res.status(400).send("Something went wrong" + err.message)
    }
})


module.exports={
    userRouter
}