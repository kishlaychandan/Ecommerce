const { randomBytes } = await import("node:crypto");


export function generateCrypto(){
    return randomBytes(256,(err,buffer)=>{
       if(err){
           console.log(err)
       }
        return `${buffer.toString("hex")}`;
    })
}