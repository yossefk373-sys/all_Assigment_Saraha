import multer from "multer"
import {randomUUID} from "node:crypto"
import fs from "node:fs"
import {resolve} from "node:path"
export const multerlocal=({custompath="general",customtype=[]}={})=>{
    const fullpath=resolve (`upload/${custompath}`)
    if(!fs.existsSync(fullpath)){
        fs.mkdirSync(fullpath,{recursive:true})
    }
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,fullpath)

        },
        filename:(req,file,cb)=>{
        cb(null, randomUUID() + "__" + file.originalname);
        }
    })
    const filefilter=(req,file,cb)=>{
        if(! customtype.includes(file.mimetype)){
    return cb("invalid file",false)
}else{
    return cb(null,true)
}
    }
    const upload=multer({storage,filefilter})
        return upload 
}