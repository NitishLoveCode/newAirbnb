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
const image_downloader=require("image-downloader")
const path=require("path")

const upload_public= path.join(__dirname,"uploads")
const multer=require("multer")
const fs=require("fs")

app.use("/uploads",express.static(upload_public))

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

// ---------------------------logout function----------------------
app.post("/logout",async(req,res)=>{
    const token=req.cookies
    if(token){
        res.clearCookie("itsToken")
        res.status(200).json("Logout sucessfully.")
    }
})


// -------------------------image uploaded by url------------------
app.post("/upload-by-url",async(req,res)=>{
    const img_url=req.body.urlphoto
    const name=Date.now()+".jpg"
    await image_downloader.image({
        url:img_url,
        dest: __dirname + "/uploads/"+name
    })
    res.status(200).json(name)


})
// --------------------------image upload local----------------------
const photoMiddleware=multer({dest:"uploads/"})
app.post("/local-img-upload",photoMiddleware.array("photos",100),async(req,res)=>{
    const all_img=[]
    for(let i=0;i<req.files.length;i++){
        const {originalname,filename,path}=req.files[i]
        const fileType=originalname.split(".")
        const imageName=Date.now() + originalname
        fs.renameSync(path,"uploads\\"+imageName)
        all_img.push(imageName)
    }
    res.status(200).json(all_img)
})


// ----------------------------------------new post------------------------
app.post("/new-post",async(req,res)=>{
    const data=req.body
    console.log(data)
})


app.listen(process.env.PORT,()=>{
    console.log(`server is started at ${process.env.PORT}`)
})
