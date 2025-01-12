const express= require("express");


// const router=express.Router(); or (both are same)
const authRouter=express.Router();


// app.use("/test",authMiddleware,()=>{}); // or (both are same)
// router.use("/test",authMiddleware,()=>{}); // or (both are same)
authRouter.use("/test",authMiddleware,()=>{});
