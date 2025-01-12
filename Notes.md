/**

//We can write this route handle as any of them
/**
 * app.use("/user",RouteHandler1,RouteHandler2,RouteHandler3,RouteHandler4)
 * app.use("/user", [RouteHandler1,RouteHandler2,RouteHandler3,RouteHandler4])
 * app.use("/user", [RouteHandler1],RouteHandler2,RouteHandler3,RouteHandler4)
 * app.use("/user", [RouteHandler1,RouteHandler2],RouteHandler3,RouteHandler4)
 * app.use("/user", RouteHandler1,[RouteHandler2,RouteHandler3,RouteHandler4])
 */


 * 
 * GET /users: It will go through all the app.xxx("matching route") functions until it reaches the function that sends the response back. 
        The function that sends the response is called the Request Handler.
        All the functions it passes through along the way are called Middlewares.
 * 
 * 
 *  Whenever you make an API call , it goes through middleware chain and finally it goes to Request Handler (The function which is sending response back)
 * 
 * The job of express js is - to take request and send response back
 */





 const mongoose=require("mongoose");


//Cluster
const connectDB=async ()=>{
    await mongoose.connect
    ("mongodb+srv://Divyanshi:DivyanshiSingh@namastenode.3acot.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode&&tls=true");
}

connectDB()
.then(()=>{
    console.log("Database Connection Established")
})
.catch(()=>{
    console.error("Database Connection Failed")
})


/*
The problem with the above code is that the server has started listening to the request and then the database connection is established.

The correct Process is : Once the database connection is established then only you do app.listen.
 
How can we do it?

       Export connectDB function from database.js then use it in app.js

              connectDB()
.then(()=>{
    console.log("Database Connection Established")

    app.listen(7777,()=>{
    console.log(Server has started listening )})
})
.catch(()=>{
    console.error("Database Connection Failed")
})

*/
