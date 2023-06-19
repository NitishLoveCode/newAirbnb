const mongoose= require("mongoose")


mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("Database is connected")
    })
    .catch((err)=>{
        console.log(err)
    })