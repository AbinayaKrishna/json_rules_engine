const mongoose=require('mongoose');
const affiliateSchema=mongoose.Schema({
    affiliate_name:{type:String,required:true},
    affiliate_id:{type:String,required:true},
    affiliate_url:{type:String,required:true},
    user_id:{type:String,required:true},
    user_name:{type:String,required:true},
    paid_earnings:{type:Number,default:0},
    unpaid_earnings:{type:Number,default:0},
    // paid_referals:{type:String,required:true},
    // unpaid_referals:{type:String,required:true},
    refered_by:{type:String,default:null},
    wallet:{type:Number,default:0},
    earnings_by_referals:{type:Array,default:[]}
    
},{timestamps:true});

const affiliateModel=mongoose.model('affiliates', affiliateSchema);
module.exports=affiliateModel;
