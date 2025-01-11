const express = require("express");
// require("./config/database")
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation")
const bcrypt = require('bcrypt');
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

//Middleware to read a JSON file.
app.use(express.json());
app.use(cookieParser());

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

      //create a JWT Token
//const token= await jwt.sign(payload, privatekey)
      const token= await jwt.sign({_id:user._id}, "DevTinder@790")
      

      //Add the token to the cookie and send response back to the user
      res.cookie("token", token)
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


app.get("/profile",userAuth, async (req,res)=>{
try {

// To get the user we will attach the user from the middleware to req and sent it here

const user=req.user;
res.send(user)

}
catch(err){
  res.status(400).send("Something went wrong"+ err);
}

})


app.post("/sendConnectionRequest", userAuth ,async (req,res)=>{
try{
  const user=req.user;
  console.log(user.firstName + " wants to connect")
  res.send(user.firstName + " wants to connect")
}
catch(err){
  res.status(400).send("Something went wrong"+ err);
}

})


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
