// router.post("/register-affiliate", async function (req, res) {
//     // console.log(req.body)
//     try {
//       const newAffiliate = new Affiliate(req.body);
//       await newAffiliate.save();
//       res.json({ message: "User Registered Successfully" });
//     } catch (error) {
//       res.json({ message: "Registration Failed" });
//     }
//   });
  
  // router.post("/rules", async function (req, res) {
  //   let engine = new Engine();
  //   engine.addRule({
  //     conditions: {
  //       any: [
  //         {
  //           fact: "product",
  //           operator: "equal",
  //           value: "x",
  //         },
  //         {
  //           fact: "product",
  //           operator: "equal",
  //           value: "y",
  //         },
  //       ],
  //     },
  //     onSuccess: async function () {
  //       const affData = {
  //         userID: req.body.userID,
  //         refered_by: req.body.refered_by,
  //         reward: req.body.cost * 0.05,
  //       };
  //       try {
  //         const affUser = await Affiliate.findOne({
  //           referal_link: req.body.refered_by,
  //         });
  
  //         const a = affUser.referals.push({
  //           userID: req.body.userID,
  //           name: req.body.name,
  //         });
  //         const b = await affUser.save();
  //         console.log(b);
  //         //   const affliateData = new AffiliateWallet(affData);
  //         //   await affliateData.save();
  //         //   res.json({ message: "affiliate Successfully" });
  //       } catch (error) {
  //         res.json({ message: "Not added" });
  //       }
  //     },
  //     onFailure: async function () {
  //       const affData = {
  //         userID: req.body.userID,
  //         link: req.body.link,
  //         reward: req.body.cost * 0.1,
  //       };
  //       try {
  //         const affliateData = new AffiliateWallet(affData);
  //         await affliateData.save();
  //         res.json({ message: "affiliate Successfully" });
  //       } catch (error) {
  //         res.json({ message: "Not added" });
  //       }
  //     },
  //     event: {
  //       type: "Reward",
  //       params: {
  //         message: "event executed successfully",
  //       },
  //     },
  //   });
  
  //   let facts = {
  //     product: req.body.product,
  //     cost: req.body.cost,
  //     userID: req.body.userID,
  //     refered_by: req.body.refered_by,
  //     name: req.body.name,
  //   };
  
  //   const { events } = await engine.run(facts);
  //   events.map(async (event) => {
  //     console.log(event.params.message);
  //   });
  // });
  