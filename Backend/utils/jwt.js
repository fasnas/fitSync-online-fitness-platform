import jwt from "jsonwebtoken"

export const generateAccesToken=(user)=>{
    return jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
}

export const verifyToken=(token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(error){
        console.log("jwt verification error")
        return null;
    }
}