
export const Authurization=(role=[])=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            throw new Error("UnAuthurization ",{cause:404});
            
        }
        next()
    }
}