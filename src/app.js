const express = require("express");
// require("./config/database")
const connectDB=require("./config/database")
const app = express();
const User=require("./models/user")

//Middleware to read a JSON file. 
app.use(express.json());
//API creation for signup 


app.post("/signup",async (req,res)=>{
    
   console.log(req.body)

//Creating new instance of user model
const user= new User(req.body);

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
.then(()=>{
    console.log("Database Connection Established")
    app.listen(2000, () => {
        console.log("Server is running on port 2000");
    });
})
.catch(()=>{
    console.error("Database Connection Failed")
})