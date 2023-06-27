const express = require('express');
const offerRoute = express.Router();
const Offer = require('../model/offerSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_CODE = "this is the secret code";

getUserByToken = (token) => {
   return new Promise((response, reject) => {
      if (token) {
         let userdata;
         try {
            userdata = jwt.verify(token, SECRET_CODE)
            response(userdata)
         } catch (err) {
            reject("Invalid Token!")
         }
      } else {
         reject("Token not found")
      }
   })
}

offerRoute.get("/list", (req, res) => {

});

offerRoute.post("/create", (req, res) => {
   getUserByToken(req.headers.authorization).then((user) => {
      //res.status(200).send(user)
      Offer.create({ ...req.body, username: user.username }).then((offer) => {
         res.status(201).json({
            message: "offer created successfully",
            offer: offer
         })
      }).catch((err) => {
         res.status(500).send({
            message: "Failed to create offer",
            error: err
         })
      })
   }).catch((err) => {
      res.status(500).send(err)
   })
});

offerRoute.put("/update/:offerId", (req, res) => {
   const offerId = req.params.offerId;
   const updatedOfferData = req.body;
   getUserByToken(req.headers.authorization).then((user) => {
      Offer.findOneAndUpdate({ _id: offerId }, updatedOfferData).then((updatedOffer) => {
         if (!updatedOffer) {
            return res.status(404).json({
               message: "Offer not found."
            });
         }
         res.status(200).json({
            message: "Offer updated successfully!",
            data: updatedOffer
         });
      }).catch(err => {
         res.status(500).json({
            message: "Failed to update Offer.",
            data: err
         })
      })

   }).catch((err) => {
      res.status(500).send(err)
   });

});



offerRoute.delete("/delete/:offerId", (req, res) => {
   const offerId = req.params.offerId;
   getUserByToken(req.headers.authorization).then((user) => {
      Offer.deleteOne({ _id: offerId }).then((response) => {
         res.json({
            message: "Offer deleted successfully",
            data: response
         });
      }).catch(err => {
         res.status(500).json({
            message: "Failed to delete!",
            data: err
         });
      });

   }).catch((err) => {
      res.status(500).send(err)
   });
})

module.exports = offerRoute;

