const express=require("express")
const requestRouter=express.Router();
const {userAuth} = require("../middlewares/auth")


requestRouter.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
    try{
      const user=req.user;
      console.log(user.firstName + " wants to connect")
      res.send(user.firstName + " wants to connect")
    }
    catch(err){
      res.status(400).send("Something went wrong"+ err);
    }
    
})



module.exports=requestRouter;