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



const validateEditProfileData=(req)=>{
const allowedEditFields=["firstName","lastName","emailId","age", "skills","photoURL", "about","gender"];

const isEditAllowed =Object.keys(req.body).every((field)=>allowedEditFields.includes(field))

console.log(req.body)
console.log(isEditAllowed)
return isEditAllowed;

}






module.exports={validateSignUpData,validateEditProfileData}