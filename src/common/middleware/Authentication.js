import jwt from "jsonwebtoken"
import * as dbservice from "../../DB/sevices/db.service.js"
import { usermodel } from "../../model/usermodel.js";
import {  ttl } from "../../DB/sevices/redis.service.js";

export const Authentication=async(req ,res,next)=>{
    const {authentication}=req.headers
    if(!authentication){
        throw new Error("token not exist",{cause:404});
    }
    const decode=jwt.verify(authentication,"yossef12")
    if(!decode?.email){
        throw new Error("invalid token",{cause:404});
    }
    const user=await dbservice.findOne({
        model:usermodel,
        filter:{email:decode.email}
    })
    if(!user){
        throw new Error("user not exist ",{cause:401});
    }

    if(user?.changecredintialAt?.getTime ()>decode?.iat*1000){
        throw new Error("token expire you must login again");
        
    }
 
    if (await ttl(`revoke_token::${user._id}::${decode.jti}`) > 0){
        throw new Error("revoke_token expire you must login again");

    }
    
    
    req.user=user 
    req.decode=decode
    next()
}