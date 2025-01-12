const express=require("express")
const profileRouter=express.Router();
const {userAuth} = require("../middlewares/auth")


profileRouter.get("/profile",userAuth, async (req,res)=>{
    try {
    
    // To get the user we will attach the user from the middleware to req and sent it here
    
    const user=req.user;
    res.send(user)
    
    }
    catch(err){
      res.status(400).send("Something went wrong"+ err);
    }
    
    })



    module.exports=profileRouter;