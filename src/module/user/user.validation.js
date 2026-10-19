import joi from "joi"
import { generalrule } from "../../common/middleware/utils/generalrule.js"


export const signupschema={
    body:joi.object({
        fname:joi.string().required(),
        lname:joi.string().required(),
        age:joi.number().min(20).max(60).required(),
        phone:joi.number().required(),
        role:joi.string().required(),
        email:joi.string().email({tlds:{allow:["com","yahoo"]}}).required(),
        password:joi.string().required(),
        cpassword:joi.string().valid(joi.ref("password")).required(),
    }),
    
    // file: generalrule.file.required(),
    files:generalrule.files.required(),

}

export const signinschema={
    body:
    joi.object({
        email:generalrule.email.required(),
        password:generalrule.password.required()
    })
}

export const refreshtoken={
    header:
    joi.object({
    authurization:joi.string().required()
    })
}

export const shareprofileschema={
    params:joi.object({
      id:generalrule.id.required()
    })
}

export const updateprofileschema={
    body:joi.object({
      fname:generalrule.fname.required(),
      lname:generalrule.lname.required(),
      age:generalrule.age.required(),
      phone:generalrule.phone.required()
    })
}

export const updatepasswordshcema={
    body:joi.object({
        password:generalrule.password.required(),
        newpassword:generalrule.password.required(),
        cpassword:generalrule.cpassword.required()
    })
}