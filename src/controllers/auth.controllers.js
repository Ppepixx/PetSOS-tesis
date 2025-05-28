import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Rol from "../models/rol.model.js";

export const register = async (req,res)=> {
    const {email, contra, username, fechadnacimiento, direccion, telefono, roles}=req.body
    try{

        const userFound= await Usuario.findOne({email});
        if(userFound)
            return res.status(400).json(["El correo ya esta en uso"]);

        const ContraHash= await bcrypt.hash(contra, 8)

        const newUser= new Usuario({
            username,
            email,
            contra: ContraHash,
            direccion,
            fechadnacimiento,
            telefono,
        })
        
        if (roles){
            const foundrol= await Rol.find({nombre: {$in: roles}})
            newUser.roles = foundrol.map(rol=> rol._id)
        }else{
            const rol= await Rol.findOne({nombre: "usuario"})
            newUser.roles= [rol._id]
        }

        const userSaved= await newUser.save();
        const token= await createAccessToken({id: userSaved._id});

        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            roles: userSaved.roles,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
            
        })
    }   catch(error){
        res.status(500).json({message: error.message })
    }
};

export const login = async (req,res)=> {
    const {email,contra}=req.body;

    try{

        const userFound= await Usuario.findOne({email})
            .populate("roles");
        if (!userFound) return res.status(400).json({message: "No tienes una cuenta creada"});

        const isMatch = await bcrypt.compare(contra, userFound.contra);

        if(!isMatch) return res.status(400).json({message:"Contraseña incorrecta"});
    
        const token= await createAccessToken({id: userFound._id});

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
            roles: userFound.roles
            
        });
    }   catch(error){
        res.status(500).json({message: error.message });
    }
};

export const logout = async(req, res)=>{
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const profile = async (req, res)=>{
    const userFound= await Usuario.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
        
    });
}

export const verifyToken= async(req, res)=> {
    const {token} = req.cookies

    if (!token) return res.status(401).json({message:"No autorizado"});

    jwt.verify(token, TOKEN_SECRET, async(err, user) =>{
        if(err) return res.status(401).json ({message: "No autorizado"});

        const userFound = await Usuario.findById(user.id).populate("roles");
        if (!userFound) return res.status(401).json ({message: "No autorizado"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            roles: userFound.roles

        });
    });
};