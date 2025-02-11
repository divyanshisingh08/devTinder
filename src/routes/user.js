const express=require("express");
const { userAuth } = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter=express.Router();

//get all the connection request received by the logged in user
userRouter.get("/user/request/recieved",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequests= await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        })
        // .populate("fromUserId",["firstName", "lastName"])
        .populate("fromUserId",["firstName lastName photURL skills age gender"])



        /* Now we have to save the data and get the details of the user liek firstname to know who has sent the request.
        There are two ways to do the same:
        1. user.save() and loop over all userId to get the details of the user

        2. using ref to establish connection request between both tables and use populate 
        - populate("fromUserId",["firstName", "lastName"]) : if the second paramater is not sent then it will send all the details like email password, created at etc
        - Other way to populate the data is to send it in form of string instread of array
        populate("fromUserId",["firstName lastName photURL skills age gender"])
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


userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try {

        const loggedInUser=req.user;

        const MyConnections=await connectionRequestModel.find({
          $or:[
          {toUserId: loggedInUser._id,status:"accepted"},
          {fromUserId: loggedInUser._id,status:"accepted"}
          ]
        })
        .populate("fromUserId","firstName lastName photoURL ")
        .populate("toUserId","firstName lastName photoURL ")

        //we don't need all the details , I want array of users not data about connections
        const data= MyConnections.map((row)=>{
            if(row.fromUserId.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
          
           return  row.fromUserId
    })

        res.json({
            data
        })
        
    } catch (error) {
        res.status(400).send("something went wrong "+ error.message)
    }
})

userRouter.get("/user/feed?page=1&limit=10",userAuth,async(req,res)=>{
    try {
        /*On home page user should see the profiles of all the other users except :
        1. their own profile
        2.his connections
        3. already sent the request/received the request
        4. ignored users
        */


        const loggedInUser=req.user;
        const page= parseInt(req.query.page) || 1;
        let limit= parseInt(req.query.limit) || 10;
        limit=limit>50 ? 50 : limit;
        const skip= (page-1)* limit;

    const connectionRequests= await connectionRequestModel.find({
        $or:[
            {fromUserId: loggedInUser._id},
            {toUserId:loggedInUser._id}
        ]
    })
    .select("fromUserId  toUserId")
    .populate("fromUserId"," firstName")
    .populate("toUserId"," firstName")

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach(req=>{
        hideUsersFromFeed.add(req.fromUserId.toString())
        hideUsersFromFeed.add(req.toUserId.toString())
    })
//Find all the users with id who are not present in  hideUsedFromFeedm array
    const users= await User.find({
      $and:[ { _id: {$nin: Array.from(hideUsersFromFeed)}},
        { _id: {$ne: loggedInUser._id}}
      ]
    }).select("firstName lastName photURL skills age gender")
    .skip(skip).limit(limit)

    res.json({data:users})
    } catch (error) {
        
    }
})

module.exports=
    userRouter  