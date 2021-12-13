const mongoose = require("mongoose")

mongoose.connect(process.env.DB).then(()=>{
    console.log("connected to data base")
}).catch(e=>{
    console.log("connection failed...")
})