const mongoose=require('mongoose');
const affiliateWalletSchema=mongoose.Schema({
    userID:{type:String,required:true},
    link:{type:String,required:true},
    reward:{type:Number,required:true},
},{timestamps:true});

const affiliateWalletModel=mongoose.model('affiliatesWallet', affiliateWalletSchema);
module.exports=affiliateWalletModel;