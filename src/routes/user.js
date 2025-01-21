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
        }).populate("fromUserId",["firstName", "lastName"])


        /* Now we have to save the data and get the details of the user liek firstname to know who has sent the request.
        There are two ways to do the same:
        1. user.save() and loop over all userId to get the details of the user

        2. using ref to establish connection request between both tables and use populate 
        */
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