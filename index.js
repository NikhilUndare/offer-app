const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 8080 ;
const userRoute = require('./routes/user')

mongoose.connect('mongodb+srv://nikundare111:Nikhil@cluster0.qmkdjbw.mongodb.net/offer?retryWrites=true&w=majority')
    .then((response) => {
        console.log("connected to mongod DB successfully!");
    })
    .catch(err => {
        console.log("connection to DB failed", err);
    })

app.use("/user",userRoute);
    
app.listen(PORT, ( ) => {
   console.log(`server is running on port ${PORT}`)
})    