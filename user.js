const express = require("express")
const mongoose = require("mongoose");
const { modelName } = require("./userSchema");

const app = express()
const PORT = process.env.PORT || 5000;

const userModel = require("./userSchema")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


const baseUri = `mongodb+srv://nimra:admin123@cluster0.veyxi.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(baseUri)
mongoose.connection.on("connected",()=>console.log("mongoose connected"))
mongoose.connection.on("error", ()=>console.log(error))


app.get("/api/user",(req,res)=>{
    userModel.find({}, (err , data)=>{
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

app.post("/api/user",(req,res)=>{
    
    const userobj = {
        username:req.body.name,
        useremail:req.body.email,
        userpass : req.body.password
    }
    userModel.create(userobj, (err,data)=>{
        if(err){
            res.send("error",err)
        }else{
            res.send(data)
        }
    })
    console.log(userobj)

})

app.put("/api/user/:id",(req,res)=>{
    const body = req.body
    const {id} = req.params

    userModel.findByIdAndUpdate({_id:id},body,{new:true},(err,data)=>{
        if (err) {
            res.send('error')
        } else {
            res.send(data)
        }
    })
})

app.delete("/api/user/:id",(req,res)=>{
    const {id} = req.params;
    userModel.findByIdAndRemove({_id:id},(err,data)=>{
        if (err) {
            res.send("error")
        } else {
            res.send(data)
        }

    })
})

app.listen(PORT,console.log(`server is running on localhost ${PORT}`))