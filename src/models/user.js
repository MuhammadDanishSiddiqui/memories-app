const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:[10,"Name can not be greater 10 characters"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:[6,"Password must be 6 character long"]
    },
    confirm :{
        type:String,
        trim:true,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.tokens
    delete userObj.password
    delete userObj.confirm
    return userObj
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) =>{
    if(!validator.isEmail(email))
    {
        throw new Error("Invalid Email")
    }
    const user =  await User.findOne({email})
    if(!user)
    {
        throw new Error("Invalid Credentials")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error("Invalid Credentials")
    }
    return user
}


userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified("password"))
    {
        user.password = await bcrypt.hash(user.password,8)
        user.confirm = await bcrypt.hash(user.confirm,8)
    }
    next()
})

const User = new mongoose.model("User",userSchema)

module.exports=User