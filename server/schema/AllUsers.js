const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const user_register=new mongoose.Schema({
    data:{
        type:Date,
        default:Date.now
    },
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
})

user_register.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})
user_register.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({id:this._id,name:this.name,email:this.email},process.env.SECRET)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        console.log(err)
    }
}
const user_schema= new mongoose.model("Users",user_register)



module.exports=user_schema
