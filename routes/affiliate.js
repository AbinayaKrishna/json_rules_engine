const express = require("express");
const router = express.Router();
const { Engine } = require("json-rules-engine");

const Affiliate = require("../model/affiliateSchema");
const Order = require("../model/orderSchema")
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
    //order detail addition and updation//
    const newOrder=await Order.findOne({id : req.body.id});
    if(newOrder){
      const orderDetails = await Order.updateOne({id : req.body.id},{
        $set : req.body
      });
      res.json({ message: "order updation success" });
    }else{
      const orderDetails = new Order(req.body);
      await orderDetails.save();
      res.json({ message: "order addition success" });
    }
  } catch (error) {
    res.json({ message: "order addition/updation Failed" });
  }
})
router.post("/order-affiliate", async function (req, res) {
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
        const earData = {
          user_name: userData.user_name,
          order_id: req.body.id,
          order_total: parseFloat(req.body.total),
          commission_amount: parseFloat(walletAmount),
          status:req.body.status
        };
        affiliateData.earnings_by_referals.push(earData);
        await affiliateData.save();
        console.log(affiliateData);
        res.json({ message: "unpaid earnings added Successfully" });
      } else if (req.body.status == "completed") {
        const affiliateData = await Affiliate.findOne({
          user_name: userData.refered_by,
        });

        console.log(req.body.status);
        const walletAmount = (parseFloat(req.body.total) * 0.05).toFixed(2);
        
        affiliateData.unpaid_earnings =
          affiliateData.unpaid_earnings - parseFloat(walletAmount);
        affiliateData.paid_earnings =
          affiliateData.paid_earnings + parseFloat(walletAmount);
        affiliateData.wallet = affiliateData.paid_earnings;

        await affiliateData.save();

        await Affiliate.updateOne({user_name:req.body.referal_id, "earnings_by_referals.order_id":req.body.id},{
          $set:{
            "earnings_by_referals.$.status":req.body.status
          }
        })
        
        console.log(affiliateData);

        // userData.orders.push(req.body);
        // await userData.save();
        // console.log(userData);

        res.json({ message: "wallet added Successfully" });
      }else if(req.body.status =="canceled"){
        const affiliateData = await Affiliate.findOne({
          user_name: userData.refered_by,
        });
        const affOrder= affiliateData.earnings_by_referals.find((e)=>e.order_id == req.body.id);
        
        affiliateData.paid_earnings =
          affiliateData.paid_earnings - affOrder.commission_amount;
        affiliateData.wallet = affiliateData.paid_earnings;
        await Affiliate.updateOne({user_name:req.body.referal_id, "earnings_by_referals.order_id":req.body.id},{
          $set:{
            "earnings_by_referals.$.status":req.body.status,
            "earnings_by_referals.$.commission_amount":affiliateData.wallet
          }})
        await affiliateData.save();
        console.log(affiliateData);
        res.json({ message: "order canceled and affiliate updated Successfully" });
      }
    } else {
      res.json({ message: "not an affiliate" });
    }
  } catch (error) {
    res.json({ message: "Not found" });
  }
});

router.post("/test", async function (req, res) {
  // const affiliateData = await Affiliate.findOne({
  //   user_name: req.body.referal_id,
  // });
  // console.log(affiliateData)

  //  await Affiliate.updateOne({user_name:req.body.referal_id, "earnings_by_referals.order_id":req.body.id},{
  //   $set:{
  //     "earnings_by_referals.$.status":req.body.status
  //   }
  // })
  
  // console.log(a)
  const newOrder=await Order.findOne({id : req.body.id});
    if(newOrder){
      const orderDetails = await Order.updateOne({id : req.body.id},{
        $set : req.body
      });
    }else{
      const orderDetails = new Order(req.body);
      await orderDetails.save();
    }

});
module.exports = router;
