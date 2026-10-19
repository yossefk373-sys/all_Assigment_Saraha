import { compareSync } from "bcrypt";
import { Decrypt, Encrypt } from "../../common/security/encrypt.js"
import { Compare, Hash } from "../../common/security/hash.js"
import * as dbservice from "../../DB/sevices/db.service.js"
import { usermodel } from "../../model/usermodel.js"
 import  {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client();
import jwt from "jsonwebtoken"
import { randomUUID } from "crypto";
import { delete_key, keys, setvalue } from "../../DB/sevices/redis.service.js";


export const signup=async(req ,res ,next)=>{
    const {fname,lname,email,password,age,phone,role,profileimage}=req.body
    const emailexist=await dbservice.findOne({
        model:usermodel,
        filter:{email}
    })
    if(emailexist){
        throw new Error("email is already exist",{cause:401})
    }
const paths = [];
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            paths.push(file.path);
        }
      }
    
    const data=await dbservice.create({
        model:usermodel,
        data:{
          fname,
          lname,
          email,
          password:await Hash(password),
          age,
          phone:Encrypt(phone),
          role,
          profileimage:paths
         
        }  
    })
    
     return res.status(200).json({message:"signup success",
        data:data
    })
}

export const signinwithgamail=async(req ,res ,next)=>{
    const {idToken}=req.body
    console.log({idToken});


  const decoded = await client.verifyIdToken({
      idToken,
      audience:"819122405216-92sf729d8dta6u1guukamncqlg30ltlj.apps.googleusercontent.com"

  });
  const {email,email_verified,given_name,family_name,picture} = decoded.getPayload();
let user =await dbservice.findOne({
  model:usermodel,
  filter:{email}
})
if(!user){
 user= await dbservice.create({
    model:usermodel,
    data:{
      fname:given_name,
      lname:family_name,
      email,
      profileimage:picture,
      isconfimed:email_verified,
      provider:"google"
    }
  })
  const access_token=jwt.sign({_id:user.id,email:user.email},"yossef2005",{expiresIn:60*5} )
  const refresh_token=jwt.sign({_id:user.id,email:user.email},"12345")
  return res.status(200).json({message:"done",token:{access_token,refresh_token}})
}
}


export const signin = async (req, res, next) => {
  const {email ,password}=req.body
  const user=await dbservice.findOne({
    model:usermodel,
    filter:{email}
  })
  if(!user){
    throw new Error("user not exist",{cause:404});
    
  }
  if(!await compareSync(password,user.password)){
    throw new Error("invalid password",{cause:404});
  }
  const tokenid=randomUUID()
  const access_token=jwt.sign({id:user._id,email:user.email},"yossef12",{expiresIn:60*5,
    jwtid:tokenid
  })
  const refresh_token=jwt.sign({id:user._id,email:user.email},"2005",{
     jwtid:tokenid
  })
  
  return res.status(200).json({message:"done",token:{access_token,refresh_token}})
};


export const list=async(req,res,next)=>{
  const {phone}=req.headers

  return res.status(200).json({message:"your profile :",user:{...req.user._doc,phone:Decrypt(req.user.phone)} 
})
}


export const refreshtoken=async(req,res,next)=>{

  const {authurization}=req.headers
  if(!authurization){
    throw new Error("token not exist",{cause:404});
  }
  const decoded=jwt.verify(authurization,"2005")
  if(!decoded){
    throw new Error("invalid token",{cause:404});
  }
  const user=await dbservice.findOne({
    model:usermodel,
    filter:{email:decoded.email}
  })
  if(!user){
    throw new Error("user not found",{cause:400});
    
  }
  const access_token=jwt.sign({id:user._id,email:user.email},"zezo",{expiresIn:60*5})
  return res.status(200).json({message:"done",access_token})

}

export const shareprofile=async(req,res,next)=>{
  const {id}=req.params
  const user=await dbservice.findById({
    model:usermodel,
    id,
    option:{password:0}
  })
  if(!user){
    throw new Error("user not exist",{cause:404});  
  }
  user.phone=Decrypt(user.phone)
return res.status(200).json({message:"done",user})
}

export const updateprofile=async(req,res,next)=>{
  const{fname,lname,phone,age}=req.body
  let updatequery={}
  if(fname!==undefined){
    updatequery.fname=fname
  }  if(lname!==undefined){
    updatequery.lname=lname
  }  if(phone!==undefined){
    updatequery.phone=Encrypt(phone)
  }  if(age!==undefined){
    updatequery.age=age
  }
  const user=await dbservice.findByIdAndUpdate({
    model:usermodel,
    id:req.user._id,
    update:updatequery
  })
  return res.status(200).json({message:"updated done",user})
}

export const updatepassword=async(req,res,next)=>{
  const {password,newpassword}=req.body
  if(! await compareSync(password,req.user.password)){
    throw new Error("invalid password");
  }
  req.user.password=await Hash(newpassword)
  req.user.save()
  return res.status(200).json({message:"updated password done",user:req.user})
}

export const logout=async(req,res,next)=>{
 
 const {flag}=req.query

 if(flag=="all"){
  req.user.changecredintialAt=new Date()
  req.user.save()
  await delete_key(await keys(`revoke_token::${req.user._id}`))
 }{
 await setvalue({
   key:`revoke_token::${req.user._id}::${req.decode.jti}`,
   value:`${req.decode.jti}`, 
   ttl:req.decode.exp - Math.floor((Date.now() / 1000))
   })

 }


return res.status(200).json("Logout done")

}