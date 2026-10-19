import { createClient } from "redis"

export const redis_client = createClient({
  url: "rediss://default:gQAAAAAAAY2PAAIgcDE0N2RhNDI5MTc2NzA0OGFkOGRkMDZmMmY1NzAwNDYxYg@true-mite-101775.upstash.io:6379"
});

export const connectredis =async()=>{
    try {
        await redis_client.connect()
        console.log("redis connect success ");
        
    } catch (error) {
        console.log("redis connect failed  ", error);
        
    }
}

