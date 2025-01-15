const express=require("express")
const requestRouter=express.Router();
const {userAuth} = require("../middlewares/auth");
const { connectionRequestSchema } = require("../models/connectionRequest");


// requestRouter.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
//     try{
//       const user=req.user;
//       console.log(user.firstName + " wants to connect")
//       res.send(user.firstName + " wants to connect")
//     }
//     catch(err){
//       res.status(400).send("Something went wrong"+ err);
//     }
    
// })



requestRouter.post("/request/send/:status/:touserId", userAuth ,async (req,res)=>{
  try{
  
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;

    //new instance of connectionRequest

    const connectionRequest=new connectionRequest({
      fromUserId,
      toUserId,
      status
    })

    /*corner cases for API
    1. Status can be only - interested , ignored
    2. Valid user Id should be there
    3. Check if connection is already there
    4. user should not be able to send connection to themselves
    */

    const data= await connectionRequest.save();

    req.json({
      message: "Connection Request sent successfully",
      data
    })

  }
  catch(err){
    res.status(400).send("Something went wrong"+ err);
  }
  
})


module.exports=requestRouter;