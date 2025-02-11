const express=require("express")
const requestRouter=express.Router();
const {userAuth} = require("../middlewares/auth");
const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");


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



requestRouter.post("/request/send/:status/:toUserId", userAuth ,async (req,res)=>{
  try{
  
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;


    /*corner cases for API
    1. Status can be only - interested , ignored
    2. Valid user Id should be there
    3. Check if connection is already there
    4. user should not be able to send connection to themselves
    */

    //1
const allowedStatus=["interested","ignored"];
if(!allowedStatus.includes(status)){
 return res.status(400).json({message:" Invalid Status" + message})
}


//2 
const toUser=await User.findById(toUserId);
if(!toUser){
  return res.status(400).json({message:"User Does not exist"})
}





//3 if any existing connection is there
const existingConnection= await connectionRequestModel.findOne({

  $or:[  {fromUserId, toUserId },
         {fromUserId: toUserId,toUserId:fromUserId}
      ]

})

if(existingConnection){
  throw new Error("Connection Request Already Exists")
}
//4 This is not a good way to check as the type of id is object id.SO WE will use pre middleware in the schema itself
// if(toUserId==fromUserId){
//   throw new Error("You Cannot sent request to yourself")
// }



   //new instance of connectionRequest

   const connectionRequest=new connectionRequestModel({
    fromUserId,
    toUserId,
    status
  })

const data= await connectionRequest.save();

  res.json({
      message:req.user.firstName +" is " + status + " in "+  toUser.firstName,
      data
    })

  }
  catch(err){
    res.status(400).send("Something went wrong"+ err);
  }
  
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const LoggedInUser=req.user;
    const {status,requestId}= req.params; 
     
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:" Invalid Status" + message})
     }

     /*Now we will check if the:
     1. the requestId of the request is already there in the ConnectionRequestModel (database) (it will be in form of ID)
     2. if connection is there so the toUser in that request must be same as loggedIn user here
     3. status should be interested then only loggedInUser will accept the request

     */

     const connectionRequest= await connectionRequestModel.findOne({
      _id: requestId ,
      toUserId: LoggedInUser._id,
      status: "interested"
     })

     if(!connectionRequest){
     return  res.status(400).json({message:"Connection Request Not Found"})
     }

     connectionRequest.status= status;

     const data= await connectionRequest.save();

     res.json({
      message:"Connection Request  " + status,
      data
     })
    

  }
  catch(err){
    res.status(400).send("Something went wrong "+ err.message)
  }
})

module.exports=requestRouter;