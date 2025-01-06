const mongoose=require("mongoose");


//Cluster
const connectDB=async ()=>{
    await mongoose.connect
    ("mongodb+srv://Divyanshi:DivyanshiSingh@namastenode.3acot.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode&&tls=true");
}

module.exports=connectDB;
