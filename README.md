# serverIT to practice

## Project details (development phase)
This project aims to practice his knowledges in NodeJS first, then to do frontend with Semantic UI.
It's a file server for the IT7 from ESATIC. It gathers all corros per matter. To access them, we have to sign up.
Then, we have to sign in to access all directories. User will be able to upload corros and download, also to chat with his friends from IT7.
We cut the project in four (4) main parts:
-> Authentication arc
-> User session arc
-> Share corro arc
-> Chat arc

## I- Authentication arc
Firstly, we have implemented everything that is sign up, sign in, forgot password, email verification, ...
For our database, we've used MySQL and npm's mysql module allowing to connect db to our back-end code. To manage email sending, we've used npm's nodemailer module. We've also used npm's joi module to submit client's input and npm's bcrypt module to encrypt passwords. About email sending, we thought it was good to use tokens to confirm emails.

## II- User session arc
Secondly, we have established client area, that is to say we implemented homepage and profile page. We've used express-session to provide an user session to all clients.
About profile page, client will be able to update his informations like username. He can also delete his account.

## II- Share corro arc
Thirdly, we have established the way to upload corros. We have used npm's multer module to do it. User will only have to select the corro he wants to share and point out the way (directory of corro).

## npm modules used
* bcrypt
* body-parser
* connect-redis
* dotenv
* ejs
* express
* express-session
* joi
* jsonwebtoken
* multer
* mysql
* nodemailer
* redis

## In-built Node modules 
* path
* fs