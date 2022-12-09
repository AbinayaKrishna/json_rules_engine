const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    user_id:{type:String,required:true},
    user_name:{type:String,required:true},
    refered_by:{type:String,default:null},
    // orders:{type:Array,default:[]}
    
    
},{timestamps:true});

const userModel=mongoose.model('users', userSchema);
module.exports=userModel;