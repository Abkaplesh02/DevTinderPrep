<br>#Dev Tinder APIs<br><br>

<br>## authRouter<br>
-POST /signup  <br>
-POST /Login    <br>
-POST /Logout    <br>


<br>## profileRouter<br>
-GET /profile/view    <br>
-PATCH /profile/edit    <br>
-PATCH /profile/password   <br>


<br>## connectionRequestRouter<br>
-POST /request/send/interested/:userID    <br>
-POST /request/send/ignored/:userID       <br>
-POST /request/review/accepted/:requestId   <br>
-Post /request/review/rejected/:requestId    <br>


<br>## userRouter<br>
-GET /user/connections    <br>
-GET /user/requests/recieved    <br>
-GET /user/feed -Get you the profiles of other users on the platform   <br>

status:ignored , interested, accepted , rejected