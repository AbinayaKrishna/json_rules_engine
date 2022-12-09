const express = require("express");
const router = express.Router();
const { Engine } = require("json-rules-engine");
// const AffiliateWallet = require("../model/affiliateWalletSchema");
const Affiliate = require("../model/affiliateSchema");
// const Referal= require("../model/referalSchema")
const User = require("../model/userSchema");
router.post("/register-affiliate", async function (req, res) {
  try {
    if (req.body.agreeAffililate == "checked") {
      const newAffiliate = new Affiliate(req.body);
      await newAffiliate.save();
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ message: "Affiliate Registered Successfully" });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ message: "User Registered Successfully" });
    }
  } catch (error) {
    res.json({ message: "Registration Failed" });
  }
});

router.post("/order", async function (req, res) {
  try {
    req.body.referal_id="Developer";
  console.log(req.body)
    if (req.body.referal_id !== null) {
      const userData = await User.findOne({
        refered_by: req.body.referal_id,
        user_id: req.body.customer_id,
      });

      console.log(userData);
     
      if (req.body.status == "on-hold") {
        const affiliateData = await Affiliate.findOne({
          user_name: userData.refered_by,
        });
        console.log(affiliateData);
        const walletAmount = (parseFloat(req.body.total) * 0.05).toFixed(2);
        affiliateData.unpaid_earnings = parseFloat(walletAmount);
        await affiliateData.save();
        console.log(affiliateData);
        res.json({ message: "unpaid earnings added Successfully" });
      } else if (req.body.status == "completed") {
        const affiliateData = await Affiliate.findOne({
          user_name: userData.refered_by,
        });
        console.log(affiliateData);
        console.log(req.body.status)
        const walletAmount = (parseFloat(req.body.total) * 0.05).toFixed(2);
        console.log(walletAmount)
        console.log(affiliateData.unpaid_earnings, affiliateData.paid_earnings, affiliateData.wallet )
        affiliateData.unpaid_earnings = affiliateData.unpaid_earnings - parseFloat(walletAmount);
        affiliateData.paid_earnings = affiliateData.paid_earnings + parseFloat(walletAmount);
        affiliateData.wallet = affiliateData.paid_earnings;
        console.log(affiliateData.unpaid_earnings, affiliateData.paid_earnings, affiliateData.wallet )
        await affiliateData.save();
        console.log(affiliateData);
        userData.orders.push(req.body);
        await userData.save();
        console.log(userData);
        res.json({ message: "wallet added Successfully" });
      }
    } else {
      res.json({ message: "not an affiliate" });
    }
  } catch (error) {
    res.json({ message: "Not found" });
  }
});

router.post("/order", async function (req, res) {
  res.send(`Server Running successfully.....!`)
})
module.exports = router;
