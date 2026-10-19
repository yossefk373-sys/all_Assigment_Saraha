import joi from "joi";
import { Types } from "mongoose";



export const generalrule={
    id:joi.string().custom((value,help)=>{
     return Types.ObjectId.isValid(value) ? value : help.message("invalid id")
    }),
          fname:joi.string().alphanum(),
          lname:joi.string(),
          phone:joi.string(),
          age:joi.number(),    
          email:joi.string().email({tlds:{allow:["com","yahoo"]}}),
          password:joi.string(),
          cpassword:joi.string().valid(joi.ref("newpassword")),
          newpassword:joi.string(),

    file:joi.object({
        fieldname: joi.string(),
        originalname: joi.string(),
        encoding: joi.string(),
        mimetype: joi.string(),
        path: joi.string(),
        destination: joi.string(),
        filename: joi.string(),
        size: joi.number(),
    }).messages({
        "any.required": "file is required"
    }),

    files:joi.array().items(joi.object({
        fieldname: joi.string(),
        originalname: joi.string(),
        encoding: joi.string(),
        mimetype: joi.string(),
        path: joi.string(),
        destination: joi.string(),
        filename: joi.string(),
        size: joi.number(),})),
}
      