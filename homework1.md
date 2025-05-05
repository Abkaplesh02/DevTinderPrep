
______How to create a express server____________<br><br>
-Create a repository<br>
-Intialize the repository<br>
-node_modules , package.json,package-lock.json<br>
-Install express<br>
-Create server<br>
-Listen to port 7777<br>
-Write request handlers for /test and /hello;<br>
-Install nodemon and update scripts inside package.json<br>
-Difference between caret and tilder{~ and ^}<br>
-What are dependencies<br>
-What is the use of -g while npm install<br><br> 

<br>
_______Routing and request handlers________<br><br>
-initialize git<br>
-.gitignore <br>
-create a remote repo on github.com<br>
-push all code to remote origin<br>
-Play with routes and route extensions. ex /hello , /test etc;<br>
-Order of the routes matter a lot.<br>
-Install a postman and make workspace/collection and then make test API call<br>
-Write logic to handle GET,POST,PATCH,DELETE API calls and them on Postman<br>
-Practice ab?c , ab+c, ab*cd , a(bc)?d, a(bc)+d,<br>
-Explore routing and use of ?, +, (),* in the routes.<br>
-Use of regex in routes /a/, /.*fly$/<br>
-Reading the query params in the routes <br>
-Reading the dynamic routes<br><br><br>


<br>
______MiddleWare and error handling_________<br><br><br>
-Multiple route handlers - Play with the code<br>
-next()<br>
-next function and error along with res.send()<br>
-app.use("/route",rH,rH2,rH3,rH4);<br>
-What is middleware?Why do we need it?<br>
-How express JS basically requests behind the secnes<br>
-Difference between app.use and app.all<br>
-Write a dummy auth middleware for admin<br>
-Write a dummy auth middleware for all user routes , except /user/login<br>
-Error handling using app.use("/",(err,req,res,next)=>{})<br><br>3

_______ Database, Schema & Models ______<br><br><br>
-Create a free cluster on MongoDB official website(MongoDB atlas)<br>
-Install mongoose library<br>
-Connect your application to the database "connection-url"/devTinder.<br>
-Call the connectDB function and connect to the database before starting application on port NO:xyza<br>
-Create a userSchema and userModel<br>
-Create post /signup APi to add data to database<br>
-Push some documents using API calls from postman<br>
-Error handling using try and catch<br>

Ques1=>What happen if we send request and dont send any response in it?


<!-- Dev Tinder is the database -->
<!-- user is the collection -->
<!-- The data added is 1 document inside a collection with different field inside-->