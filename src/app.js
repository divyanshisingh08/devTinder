const express = require("express");
// require("./config/database")
const connectDB=require("./config/database")

const app = express();


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