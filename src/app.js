const express = require("express");
// require("./config/database")
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation")
const bcrypt = require('bcrypt');

//Middleware to read a JSON file.
app.use(express.json());
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
app.post("/signup", async (req, res) => {
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

app.post("/login",async (req,res)=>{
  try{ 
    const {emailId,password}=req.body;

    //First check if emailId is present in the database or not
    const user= await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid Credentials 1")
    }

    const isPasswordValid= await bcrypt.compare(password, user.password)

    if(isPasswordValid){
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

app.get("/user", async (req, res) => {
  //Suppose we have to find a user by an emailId

  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length == 0) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
const userId=req.body.userId

    try{
        const user = await User.findByIdAndDelete({_id:userId})
        res.send("User Deleted Successfully")
    }
    catch(err){
        res.status(400).send("Something went wrong")

    }
});

//Feed API- to get all the users from the database.
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Patch API
app.patch("/user/:userId",async (req,res)=>{
 

  // const userId= req.body.userId;
   const userId= req.params?.userId;  // to get the user from URL whose info needs to be updated
  const data=req.body;

  try{

    const ALLOWED_UPDATES=[
      "userId",
      "photoURL",
      "about",
      "skills",
      "age",

    ];

    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));  

    if(!isUpdateAllowed){
      throw new Error ("Update Not Allowed")
    }


    if(data?.skills.length>10){
      throw new Error ("Skills Cannot be more than 10")
    }
  // const updatedUser=  await User.findByIdAndUpdate(userId,{firstName:"Hardik"})
  const updatedUser=  await User.findByIdAndUpdate({_id:userId},data,{
    runValidators:true,
  })
  console.log(updatedUser)
   res.send("User updated Successfully")
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
})

/**
 * app.post("/signup",async (req,res)=>{
    
    const userObj= {
        firstName:"Jasprit",
        lastName:"Bumrah",
        emailId:"bumrah@gmail.com",
        password:"bumrah@123"
    }

//Creating new instance of user model
    const user= new User(userObj);

    //user.save will return a promise therefor we have to use await since it is an async function
    try
    {
        await user.save ();
        res.send("User added successfully")
    }
catch(err){
  res.status(400).send("Error saving the user: " +err.message)
}
})
 */

connectDB()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(2000, () => {
      console.log("Server is running on port 2000");
    });
  })
  .catch(() => {
    console.error("Database Connection Failed");
  });
