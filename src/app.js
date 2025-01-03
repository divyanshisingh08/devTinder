const express = require("express");
// require("./config/database")
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//Middleware to read a JSON file.
app.use(express.json());
//API creation for signup

app.post("/signup", async (req, res) => {
  console.log(req.body);

  //Creating new instance of user model
  const user = new User(req.body);

  //user.save will return a promise therefore we have to use await since it is an async function
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

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


app.patch("/user",async (req,res)=>{
 

  const userId= req.body.userId;
  const data=req.body;

  try{
  // const updatedUser=  await User.findByIdAndUpdate(userId,{firstName:"Hardik"})
  const updatedUser=  await User.findByIdAndUpdate({_id:userId},data)
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
