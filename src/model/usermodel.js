import mongoose from "mongoose";
import { Genderenum, Providerenum, Roleenum } from "../common/enum/userenum.js";



const userschema=new mongoose.Schema({
fname:{type:String,
    required:true
},
lname:{type:String,
    required:true
},
email:{type:String,
    required:true,
    unique:true},
password:{type:String,
    required:function(){
    return this.provider=="system"? true : false
}},
changecredintialAt:Date,
profileimage:[String],
coverimage:String,
isconfimed:{type:Boolean,
    default:false},
gender:{type:String,
    enum:Object.values(Genderenum),
    default:Genderenum.male
},
role:{type:String,
    required:true,
    enum:Object.values(Roleenum),
    default:Roleenum.user
},
provider:{type:String,
    enum:Object.values(Providerenum),
    default:Providerenum.system
},
age:{
    type:Number,
    required:true,
    min:20,
    max:60,
},

phone:{type:String,
    required:function(){
    return this.provider=="system"? true : false
}}



},{
timestamp:true,
strict:true,
strictquery:true,
toJSON:{virtuals:true},
toObject:{virtuals:true}
})
export const usermodel=mongoose.model.user||mongoose.model("user",userschema)