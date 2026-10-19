import {hashSync,compareSync} from 'bcrypt';

export const Hash=async(plaintext,saltround=12) =>{
    return hashSync(plaintext,saltround)
}
export const Compare=async(plaintext,ciphertext)=>{
    return compareSync(plaintext,ciphertext)
}