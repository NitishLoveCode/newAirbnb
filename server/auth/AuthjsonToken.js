const jwt=require("jsonwebtoken")

const AuthjsonToekn=async (req,res,next)=>{
    try{
        if(req.cookies){
            const data=await jwt.verify(req.cookies.itsToken,process.env.SECRET)
            res.status(200).json(data)
        }else(
            next()
        )

    }catch{
        next()
    }
}

module.exports=AuthjsonToekn