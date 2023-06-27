const express = require('express');
const usersRoute = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_CODE = "this is the secret code";

usersRoute.post("/signup", (req, res) => {
    const userdata = req.body;

    bcrypt.hash(userdata.password, 10).then((encryptedPassword) => {
        const user = new User({
            username: userdata.username,
            password: encryptedPassword,
            email: userdata.email | "",
            number: userdata.number | ""
        })

        user.save().then((userData) => {
            res.status(201).json({
                message: 'user registered succefully',
                data: userData
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'failed to register user',
                error: err
            })
        })
    }).catch(err => {
        console.log("error while encrypting", err);
    })
})

usersRoute.post("/signin", async (req, res) => {
   const userdata = req.body;
   User.findOne({username : userdata.username}).then((user)=>{
      if(!user) {
        res.status(401).json({
            message : 'user does not exit!'
        })
      }
      else{
        if(!bcrypt.compareSync(userdata.password ,user.password)){
            res.status(401).json({
                message : 'Invalid Password!'
            })
        } else {
            const token = jwt.sign({id : user._id,username : user.username},SECRET_CODE);
            res.status(200).json({
                message : "User Logged In Successfully",
                token : token
            })
        }
      }
   }).catch(err=>{
    res.send(err)
   })
})


module.exports = usersRoute;