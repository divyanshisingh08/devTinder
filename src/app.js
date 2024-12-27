const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");

// ROUTES

// Example User Routes
// app.get("/user", (req, res) => {
//     res.send({ firstName: "User" });
// });

// app.post("/user", (req, res) => {
//     res.send("Data Saved Successfully");
// });

// app.delete("/user", (req, res) => {
//     res.send("User Deleted");
// });

// Route Matching Examples
// app.get("/a(bc)?d", (req, res) => {
//     res.send("Matched pattern: a(bc)?d");
// });

// app.get("/ab*c", (req, res) => {
//     res.send("Matched pattern: ab*c");
// });

// app.get(/.*fly$/, (req, res) => {
//     res.send("Matched pattern ending with 'fly'");
// });

// Route Parameters Example
// app.get("/user/:userId/:password", (req, res) => {
//     console.log(req.params);
//     res.send("Received query parameters");
// });

// ROUTE HANDLERS & MIDDLEWARES

// app.use(
//     "/user",
//     (req, res, next) => {
//         console.log("Executing Route Handler 1");
//         next();
//     },
//     [
//         (req, res, next) => {
//             console.log("Executing Route Handler 2");
//             next();
//         },
//         (req, res, next) => {
//             console.log("Executing Route Handler 3");
//             res.send("Response from Handler 3");
//             next();
//         }
//     ],
//     (req, res, next) => {
//         console.log("Executing Route Handler 4");
//     }
// );

// USE OF MIDDLEWARES

// app.get("/admin/getAllData", (req, res, next) => {
//     const token = "xyz";
//     const isAuthorized = token === "zyz";
//     if (isAuthorized) {
//         res.send("All Data Sent");
//     } else {
//         res.status(401).send("Unauthorized Request");
//     }
// });

// app.get("/admin/deleteUser", (req, res, next) => {
//     const token = "xyz";
//     const isAuthorized = token === "zyz";
//     if (isAuthorized) {
//         res.send("User Deleted");
//     } else {
//         res.status(401).send("Unauthorized Request");
//     }
// });

/**
 * Middleware Optimization: Repetitive logic for authorization can be avoided by using a middleware function.
 */

// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//     res.send("All Data Sent");
// });

// app.delete("/admin/deleteUser", (req, res) => {
//     res.send("User Deleted");
// });

// ERROR HANDLING MIDDLEWARE
// Note: The order of middleware matters. Error-handling middleware should be defined last.
app.use("/",(err, req, res, next) => {
    if (err) {
        res.status(500).send("An error occurred on the server");
    }
});
// We should write this for the route "/" at the end so if any of the function throws error it will handle them.


app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
