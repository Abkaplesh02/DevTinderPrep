
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


<br> _____Diving into the APIS________ <br><br><br>
-What is difference between JSon and JavaScript object<br>
-Add the express.json middleware to your app<br>
-Make your signup APi dynamic to recieve data from the end user<br>
-APi-Get user by password
-API-get all users from the database
-Api-get users by id
-User.findOne with duplicate password, which object returned<br>
-Create a delete user APi<br>
-Difference between put and patch<br>
-Api-Update a user<br>
-Explore the mongoose documentation for models methods<br>
-what are options in model.findOneAndUpdate method , explore more about it<br>
-Api-Update the user with email Id<br>
-Install validator<br>
-Explore validator function and library and use validator func for password , email and urls <br>


<br><br>__Data Sanitization and schema validation____<br><br>
-Explore schemaType options from documentations<br>
-add required,unique,lowercase,min,minlength,trim<br>
-Add default<br>
-Create a custom validate function for gender<br>
-Improve the DB schema - PUT all appropiate validation on each field in schema<br>
-Add timestamp to the userSchema<br>
-Add api level validation on Patch request and signup post api.
-Data Sanitizing::Add api validation for each field
-Never trust req.body <br>

<br><br>___Encrypting password___<br><br>
-Validate data in signup API<br>
-Install bcrypt package<br>
-Create passwordHash using bcrypt.hash and save the user with encrypted password<br>
-Create login APi <br>
-Compare passwords and throw error if email or password is invalid<br>


<br><br>______Authentication,Jwt and  cookies_____<br><br>
-install cookie-parser<br>
-just send a dummy cookie to user<br>
-create GET/profile API and check if you get the cookie back<br>
-install JSONwebtoken<br>
-In login API , after email and password validation, create a Jwt token and send it to user in cookie<br>
-read the cookie inside your profile API and find the logged in user<br>
-userAuth Middleware<br>
-Add the userAuth middleware in profile APi and new sendConnectionrequest API<br>
-Set the expiry of JWT token and cookies to 7 days<br>
-Create userSchema method to getJWT()<br>
-Create userSchema mehtod to comparepassword(passwordInputByUser)<br>



<br><br>_____ Diving into the APIs and express Router_____<br><br>
-Explore tinder APIs<br>
-Create a list of all API you can think in Dev Tinder<br>
-Group multiples routes under respective routers<br>
-Explore read documentations of express.Router<br>
-Create routes folder for managing auth , profile, request routers<br>
-Create authRouter,profileRouter,requestRouter<br>
-Import these router in app.js<br>
-Create post /logout API <br>
-create Patch /profile/edit API<br>
-create Patch /profile/password API=>forgot password api<br>
-make you validate all data in every post , patch apis<br>


<br><br>_____ Logical DB Query & Compound Indexes_______<br><b>
-Create a connection request Schema<br>
-Send connection request API<br>
-Proper validation of data<br>
-Think about all corner cases and handle them<br>
-$or query and $and query in monogoDB (logical queries)<br>
-schema.pre("save) function<br>
-Read more about indexes in MongoDB<br>
-Why do we need index in DB?<br>
-Advantages and disadvantage of indexes<br>
-Read the artice about compound indexes<br>
-Why we should not make too many indexes.<br>




<br><br>_____ref, Populate & Thought process of writing APIs______<br><br>
-write code with proper validation for /request/review/:status/:requestId<br>
-Read about ref and populate
-Create /GET request for user/request/recieced/pending with all checks.
-Create /GET request for user/connections

<br><br>_____Building Feed API & Pagination___<br><br>
-logic for GET /feed API<br>
-explore the $nin, $and , $ne and other queries<br>



Ques1=>What happen if we send request and dont send any response in it


<!-- Dev Tinder is the database -->
<!-- user is the collection -->
<!-- The data added is 1 document inside a collection with different field inside-->

-Thought process -POST vs GET

