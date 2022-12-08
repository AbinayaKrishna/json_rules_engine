const mongoose=require('mongoose');
const referalSchema=mongoose.Schema({
    referal_id:{type:String,required:true},
    affiliate_name:{type:String,required:true},
    affiliate_id:{type:String,required:true},
    amount:{type:String,default:0}
    
},{timestamps:true});

const referalModel=mongoose.model('referals', referalSchema);
module.exports=referalModel;
