const jwt = require("jsonwebtoken");
const mongoose=require("mongoose");
const validator=require ("validator")
const bcrypt = require('bcrypt');
const userSchema= new mongoose.Schema({

    firstName: {
        type: String,
        required:true,
        maxLength:50,
    },
     
    lastName: {
        type: String
    },

    //If a field is unique then mongodb automatically creates index for it,
    //  to explicitly set a index you can set index==true,
    //  compound Index- when you use multiple field to index
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address")
            }
        }

    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password")
            }
        }
    },

    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error("Gender data not valid" + value)
            }
        }

        //By default this validate function will run only on creation of a new user not while updating the old user.
        // We have to set the runValidators as true in API Options .
    },
    photoURL:{
        type: String,
         default: "This is default photo of the user",
        //  validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("Invalid Photo URL" + value)
        //     }
        // }

    },
    about:{
        type: String,
        default: "This is default About of the user"
    },
    skills:{
        type: [String],
    }

   
},{
    timestamps:true

})


userSchema.methods.getJWT= async function (){
    const user=this;

    const token= await jwt.sign({_id:user._id}, "DevTinder@790")
      
    return token;
}

userSchema.methods.validatePassword= async function (passwordInputByUser){
    const user=this;
    const passwordHash= user.password;
    const isPasswordValid= await bcrypt.compare(passwordInputByUser, passwordHash)
    //Do not change the order
      
    return isPasswordValid;
}


const User=mongoose.model("User",userSchema);

module.exports=User;