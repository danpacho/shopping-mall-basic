# Basci Concepts of ShoppingMall

Basically this project based on standard SNS fnctionality.

## Getting started😊

-   install packages in server and client.

```
cd client
npm install

cd server
npm install
```

-   To run th server make your cluster in [Mongo Atlas]("https://www.mongodb.com/cloud/atlas")

    -   make new cluster with free-tier
    -   click connect button and slect second one, copy mongoURI
    -   save your mongoURI key in .env files for production
    -   for dev save your key in server/config/dev.js
    -   in server/config/dev.js

        ```javascript
        module.exports = {
            mongoURI: "your key here😎",
        };
        ```

## 1. backend

-   node js - express
-   db - nosql(mongo DB)
-   user login/logout with web token & bcrypt

## 2. frontend

-   react.js
-   redux | redux-middleware
-   styled components (-)
-   tailwind css (-)

```

```
