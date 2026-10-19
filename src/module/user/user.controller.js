import {Router} from "express"
import { list, logout, refreshtoken, shareprofile, signin, signinwithgamail, signup, updatepassword, updateprofile } from "./user.service.js"
import { Authentication } from "../../common/middleware/Authentication.js"
import { Authurization } from "../../common/middleware/Authurization.js"
import { Roleenum } from "../../common/enum/userenum.js"
import { Validation } from "../../common/middleware/validation.js"
import { shareprofileschema, signinschema, signupschema, updatepasswordshcema, updateprofileschema } from "./user.validation.js"
import { multerlocal } from "../../common/middleware/multer.js"

const userrouter=Router()


userrouter.post("/signup",multerlocal({custompath:"user",customtype:["image/jpeg", "image/png", "image/webp"]}).array("attachment"),Validation(signupschema),signup)
userrouter.post("/login",Validation(signinschema),signin)
userrouter.post("/refresh_token",Validation(refreshtoken),refreshtoken)
userrouter.post("/signup/gmail",signinwithgamail)
userrouter.get("/profile",Authentication,Authurization(Object.values([Roleenum.admin])),list)
userrouter.get("/share_profile/:id",Validation(shareprofileschema),shareprofile)
userrouter.patch("/update_profile/:id",Validation(updateprofileschema),Authentication,updateprofile)
userrouter.patch("/update_password/:id",Validation(updatepasswordshcema),Authentication,updatepassword)
userrouter.patch("/logout",Authentication,logout)











export default userrouter
