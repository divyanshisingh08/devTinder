

// app.get("/profile",userAuth, async (req,res)=>{
//     try {
//       // const cookies= req.cookies;
//     // console.log(cookies)  - undefined
//     // to read a cookie we needa middleware- cookie-parser 
//     // console.log(cookies) 
    
    
//     // //1. Extract the token from cookie
//     // const {token}=cookies;
//     // // console.log(token)
//     // if(!token){
//     //   throw new Error("Invalid Token")
//     // }
    
//     // // //2. Validate the token 
//     // const decodedMessage= await jwt.verify(token,"DevTinder@790");
    
//     // // console.log(decodedMessage)
//     // const {_id}= decodedMessage
    
//     // const LoggedInUser=await User.findById(_id);
//     // // console.log(LoggedInUser)
//     // if(!LoggedInUser){
//     //   throw new Error("Please Login")
//     // }
    
//     // 3. send the response (data) to the user

//     // res.send(user)

// }
// catch(err){
//   res.status(400).send("Something went wrong"+ err);
// }

// })
// app.get("/user", async (req, res) => {
//     //Suppose we have to find a user by an emailId
  
//     const userEmail = req.body.emailId;
  
//     try {
//       const user = await User.find({ emailId: userEmail });
//       if (user.length == 0) {
//         res.status(404).send("User Not Found");
//       } else {
//         res.send(user);
//       }
//     } catch (err) {
//       res.status(400).send("Something went wrong");
//     }
//   });
  
//   app.delete("/delete", async (req, res) => {
//   const userId=req.body.userId
  
//       try{
//           const user = await User.findByIdAndDelete({_id:userId})
//           res.send("User Deleted Successfully")
//       }
//       catch(err){
//           res.status(400).send("Something went wrong")
  
//       }
//   });
  
//   //Feed API- to get all the users from the database.
//   app.get("/feed", async (req, res) => {
//     try {
//       const users = await User.find({});
//       res.send(users);
//     } catch (err) {
//       res.status(400).send("Something went wrong");
//     }
//   });
  
//   //Patch API
//   app.patch("/user/:userId",async (req,res)=>{
   
  
//     // const userId= req.body.userId;
//      const userId= req.params?.userId;  // to get the user from URL whose info needs to be updated
//     const data=req.body;
  
//     try{
  
//       const ALLOWED_UPDATES=[
//         "userId",
//         "photoURL",
//         "about",
//         "skills",
//         "age",
  
//       ];
  
//       const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));  
  
//       if(!isUpdateAllowed){
//         throw new Error ("Update Not Allowed")
//       }
  
  
//       if(data?.skills.length>10){
//         throw new Error ("Skills Cannot be more than 10")
//       }
//     // const updatedUser=  await User.findByIdAndUpdate(userId,{firstName:"Hardik"})
//     const updatedUser=  await User.findByIdAndUpdate({_id:userId},data,{
//       runValidators:true,
//     })
//     console.log(updatedUser)
//      res.send("User updated Successfully")
//     }
//     catch(err){
//       res.status(400).send("Something went wrong");
//     }
//   })
  
//   /**
//    * app.post("/signup",async (req,res)=>{
      
//       const userObj= {
//           firstName:"Jasprit",
//           lastName:"Bumrah",
//           emailId:"bumrah@gmail.com",
//           password:"bumrah@123"
//       }
  
//   //Creating new instance of user model
//       const user= new User(userObj);
  
//       //user.save will return a promise therefor we have to use await since it is an async function
//       try
//       {
//           await user.save ();
//           res.send("User added successfully")
//       }
//   catch(err){
//     res.status(400).send("Error saving the user: " +err.message)
//   }
//   })
//    */
  