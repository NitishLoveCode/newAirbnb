const express=require("express")
const app=express()
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
dotenv.config({path:"./.env"})
require("./db/conn")
const bcrypt=require("bcrypt")
const users=require("./schema/AllUsers")

app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(express.json())
app.use(cookieParser())
const AuthjsonToekn=require("./auth/AuthjsonToken")



app.post("/register",AuthjsonToekn,async(req,res)=>{
    const data=req.body
    if(data.name && data.email && data.password){
        try{
            const register_Data=await new users({
                name:data.name,
                email:data.email,
                password:data.password
            })
            const token=await register_Data.generateAuthToken()
            const register_info=await register_Data.save()
            if(register_info){
                res.cookie("itsToken",token).status(200).json("User Registered.")
                console.log(register_info)
            }

        }catch(err){
            if(err.keyPattern){
                console.log(err.keyPattern.email)
                res.status(409).json("This email is already registered.")
            }
        }
    }else(
        res.status(400).json("invilid request")
    )
})

// -----------------------------login----------------------------------------

app.post("/login",AuthjsonToekn,async(req,res)=>{
    const data=req.body
    if(data.email && data.password){
        try{
            const resData=await users.findOne({email:data.email})
            if(res){
                const passMatch=await bcrypt.compare(data.password,resData.password)
                if(passMatch){
                    const token=await resData.generateAuthToken()
                    res.cookie("itsToken",token)
                    res.status(200).send({id:resData._id, name:resData.name,email:resData.email})
                }else(
                    res.status(401).json("invalid credentials")
                )

            }else(
                res.status(404).json("User not found")
            )

        }catch(err){
            console.log(err)
        }
    }else(
        res.status(400).json("Bed request")
    )
})




app.listen(process.env.PORT,()=>{
    console.log(`server is started at ${process.env.PORT}`)
})
