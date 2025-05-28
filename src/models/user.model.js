import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require: true,
        trim: true,
    },
    email: {
        type:String,
        required: true,
        trim: true,
        unique:true,
    },
    contra: {
        type:String,
        required:true,
    },
    direccion: {
        type:String,
        required:true,
    },
    fechadnacimiento:{
        type:Date,
        required:true
    },
    telefono: {
        type:String,
        required:true,
    },
    roles:[{
        ref: "Rol",
        type: mongoose.Schema.Types.ObjectId
    }]
},{
    timestamps:true,
    versionKey: false
})

export default mongoose.model("Usuario",userSchema)