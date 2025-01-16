const express=require("express")
const profileRouter=express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");


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


profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{

  try{
    if(!validateEditProfileData(req)){
      throw new Error(` ${req} Invalid Edit Request`)

    }

const LoggedInUser=req.user;
console.log(LoggedInUser)

Object.keys(req.body).forEach((key)=>(LoggedInUser[key]=req.body[key]))

res.send("Profile Updated Successfully")

  }
catch(err){
  res.status(400).send("Something went wrong"+ err.message)
}


})



    module.exports=profileRouter;