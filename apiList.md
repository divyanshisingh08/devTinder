# DevTinder APIs


# authRouter
-POST /signup
-POST /login
-POST /logout

# profileRouter
-GET /profile/view
-GET /profile/edit
-GET /profile/password


# connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId


-POST/request/review/:status/:requestId
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId



-GET/connections
-GET/user/requests/received
-GET/feed