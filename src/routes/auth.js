const express= require("express");
const {validateSignUpData}=require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');


// const router=express.Router(); or (both are same)
const authRouter=express.Router();


// app.use("/test",authMiddleware,()=>{}); // or (both are same)
// router.use("/test",authMiddleware,()=>{}); // or (both are same)
// authRouter.use("/test",authMiddleware,()=>{});


//API creation for signup

//1
// app.post("/signup", async (req, res) => {
//   console.log(req.body);

//   //Creating new instance of user model
//   const user = new User(req.body);

//   //user.save will return a promise therefore we have to use await since it is an async function
//   try {
//     await user.save();
//     res.send("User added successfully");
//   } catch (err) {
//     res.status(400).send("Error saving the user: " + err.message);
//   }
// });



//2 - ep 22


authRouter.post("/signup", async (req, res) => {
    try {
   // whenever a user signs up first validate the data
   validateSignUpData(req)
  
  //  Second Encrypt the password
  
  const {firstName,lastName,emailId,password}=req.body;
  
  const EncryptedPassword= await bcrypt.hash(password, 10)
  
  
    //third Creating new instance of user model
    const user = new User({
      firstName,lastName,emailId,password:EncryptedPassword
    });
  
    //user.save will return a promise therefore we have to use await since it is an async function
  
      await user.save();
      res.send("User added successfully");
    } catch (err) {
      res.status(400).send("Error saving the user: " + err.message);
    }
  });
  
  authRouter.post("/login",async (req,res)=>{
    try{ 
      const {emailId,password}=req.body;
  
      //First check if emailId is present in the database or not
      const user= await User.findOne({emailId:emailId})
      if(!user){
        throw new Error("Invalid Credentials 1")
      }
  
      // const isPasswordValid= await bcrypt.compare(password, user.password)
      const isPasswordValid= await user.validatePassword(password)
  
      if(isPasswordValid){
  
        //create a JWT Token
  //const token= await jwt.sign(payload, privatekey)
        // const token= await jwt.sign({_id:user._id}, "DevTinder@790")
        
  
        // //Add the token to the cookie and send response back to the user
        // res.cookie("token", token)
  
        const token= await user.getJWT();
  
        res.cookie("token",token,{
          expires : new Date(Date.now()+ 8*3600000)
        })
  
  
        res.send("Login Successfull")
      }
      else{
        throw new Error("Invalid Credentials 2")
      }
    }
    catch(err){
      res.status(400).send("Something went wrong"+ err);
    }
  })


  authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })
    res.send("Logout Successfull")
  })


module.exports=authRouter;