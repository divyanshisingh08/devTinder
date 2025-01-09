const validator=require("validator")

const validateSignUpData=(req)=>{
 const {firstName,lastName, emailId,password}=req.body;


 if(!firstName || !lastName){
    throw new Error("Full Name is required")
 }

  else if(!validator.isEmail(emailId)){
    throw new Error("Invalid Email Address")
  }
  else if(!validator.isStrongPassword(password)){
                  throw new Error("Enter a Strong Password")
  }
}






module.exports={validateSignUpData}