# Sertis Blog Project
Arnon Kaewmahawong

## Server
Server code is in the `/server`. This project cannot run on Windows due to some encryption libraries.

To run the server

`npm i`

`npm i -g nodemon`

`npm start`

The server will run in port `3001`


## Frontend
Frontend is locate in `/frontend`

To start run frontend:

`npm i`

For running the first time you may have to rebuild `node-sass` as follows:

`npm rebuild node-sass`

To start:

`npm start`

The frontend will run in port `3000`



## Usage
There are 2 users in the system.

---------------------

Username: admin

Pass: admin123

---------------------

Username: user1

Pass: user1234

-----------------------

However, you can create user via the API `/users`. You will have to login to `admin` account and use JWT token that you get from login as a header `Authorization` `Bearer <JWT Token>`

There are 2 fields to create a user which are required:

`username` and `password`



