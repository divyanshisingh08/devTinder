const express = require("express");
// require("./config/database")
const connectDB = require("./config/database");
const app = express();
const cookieParser=require("cookie-parser")


//Middleware to read a JSON file.
app.use(express.json());
app.use(cookieParser());



const authRouter= require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)


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
