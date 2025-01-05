const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({

    firstName: {
        type: String,
        required:true,
        maxLength:50,
    },
     
    lastName: {
        type: String
    },

    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error("Gender data not valid")
            }
        }

        //By default this validate function will run only on creation of a new user not while updating the old user.
        // We have to set the runValidators as true in API Options .
    },
    photoURL:{
        type: String,
         default: "This is default photo of the user"

    },
    about:{
        type: String,
        default: "This is default About of the user"
    },
    skills:{
        type: [String],
    }
})


const User=mongoose.model("User",userSchema);

module.exports=User;