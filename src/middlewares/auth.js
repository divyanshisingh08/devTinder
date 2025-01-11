const jwt=require("jsonwebtoken");
const User= require("../models/user")

// const adminAuth = (req,res,next)=>{

//     console.log("Admin Auth is getting checked")
//     const token="xyz";
//     const isAuthorized =token=="xyz"
//     if(!isAuthorized){
//         res.status(401).send("Unauthorized Request")
//     }
//     else {

//         next();
        
//     }


// }


// Writing Auth Middleware after creating JWT Token


const userAuth= async (req,res,next)=>{
   
   try {
     //Read the token from cookies
    
    const {token}=  req.cookies;
    if(!token){
        throw new Error("Invalid Token")
    }
    // Validate the token
    const decodedMessage= await jwt.verify(token,"DevTinder@790");
    // Find the username
    const {_id}= decodedMessage;
    const LoggedInUser=await  User.findById(_id);
    if(!LoggedInUser){
        throw new Error("User Not Found")
    }
    req.user=LoggedInUser
    next()
}
catch(err){
    res.status(400).send("Something went wrong"+ err);
  }

}

module.exports={
    userAuth,
}