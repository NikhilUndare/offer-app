const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {type : String , required : true},
    password : {type : String , required : true},
    email : String,
    number : Number
});

module.exports = mongoose.model('User',userSchema);