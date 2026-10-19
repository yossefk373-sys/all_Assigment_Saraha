
import { redis_client } from "../connectionredis.js"

export const setvalue=async({key,value,ttl})=>{
    try {
        value=typeof value=="string"? value: JSON.stringify(value)
        ttl ? await redis_client.set(key,value,{EX:ttl}):
 await redis_client.set(key,value)
        
    } catch (error) {
        console.log("\n fail to set value",error);
        
    }
}

export const update=async({key,value,ttl}={})=>{
    try {
        if(! await redis_client.exists(key))return 0
      return  await redis_client.set(key,value,{EX:ttl})
    } catch (error) {
         console.log("\n fail to update value",error);
    }
}

export const getvalue=async({key})=>{
    try {
        try {
            return JSON.parse(await redis_client.get(key))
        } catch (error) {
          return  await redis_client.get(key)
        }
    } catch (error) {
          console.log("\n fail to get value",error);
    }
}

export const ttl=async(key)=>{
    try {
 return await redis_client.ttl(key)
    } catch (error) {
         console.log("\n fail to ttl value",error);
    }
}

export const exists=async(key)=>{
    try {
     return   await redis_client.exists(key)
    } catch (error) {
          console.log("\n fail to exists value",error);
    }
}

export const expire=async({key,ttl})=>{
    try {
     return   await redis_client.expire(key,ttl)
    } catch (error) {
          console.log("\n fail to expire value",error);
        
    }
}

export const delete_key=async(key)=>{
    try {
        if(!key?.length)return 0
    return    await redis_client.del(key)
    } catch (error) {
          console.log("\n fail to delete_key value",error);
        
    }
}

export const keys=async(key)=>{
    try {
    return    await redis_client.keys(`${key}*`)
    } catch (error) {
          console.log("\n fail to keys value",error);
        
    }
}

